import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { PokemonService, LoaderService } from '../../services';
import { PokemonDetails } from '../../app.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemon$: Observable<PokemonDetails>;
  id: number;

  subscription: Subscription;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private pokeService: PokemonService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
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
      this.changeDetector.markForCheck();
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
