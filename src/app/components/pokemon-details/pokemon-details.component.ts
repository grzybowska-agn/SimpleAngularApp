import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { PokemonService } from '../../services';
import { PokemonDetails } from '../../app.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemon$: Observable<PokemonDetails>;
  id: number;

  subscription: Subscription;

  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setIdSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setIdSubscription(): void {
    this.subscription = this.route.params.pipe(
      pluck('id')
    ).subscribe(id => {
      this.id = parseInt(id, 10);
      this.getPokemon();
    });
  }

  getPokemon(): void {
    this.pokemon$ = this.pokeService.getSinglePokemon(this.id);
  }

  updateId(num: number): void {
    this.router.navigateByUrl(`/pokemon/${num}`);
  }
}
