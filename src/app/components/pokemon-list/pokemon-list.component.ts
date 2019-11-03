import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import { PokemonService } from '../../services';
import { PokemonListItemRaw, PokemonListItem } from '../../app.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonList$: Observable<PokemonListItem[]>;
  activePage: number;
  totalPages = 10;

  subscription: Subscription;

  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setPageSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setPageSubscription(): void {
    this.subscription = this.route.queryParamMap.pipe(
      pluck('params', 'page'),
    ).subscribe((page: string) => {
        this.activePage = page ? parseInt(page, 10) : 1;
        this.getPokemonList();
    });
  }

  getPokemonId(url: string): number {
    const arr = url.split('/');
    return parseInt(arr[arr.length - 2], 10);
  }

  getPokemonList(): void {
    this.pokemonList$ = this.pokeService.getPokemonList(this.activePage).pipe(
      pluck('results'),
      map((el: PokemonListItemRaw[]) => el
        .map(item => ({ name: item.name, id: this.getPokemonId(item.url) }))
      ),
    );
  }

  updatePage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
    });
  }
}
