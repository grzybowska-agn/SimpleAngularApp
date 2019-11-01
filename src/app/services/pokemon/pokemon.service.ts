import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PokemonDetails, PokemonListItem } from '../../app.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    this.router.navigateByUrl('/error');
    return throwError(error.message);
  }

  getSinglePokemon(id: number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.url}/${id}`).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  getPokemonList(page: number): Observable<PokemonListItem[]> {
    const limit = 10;
    const offset = page > 1 ? (page - 1) * limit : 0;
    return this.http.get<PokemonListItem[]>(`${this.url}?limit=${limit}&offset=${offset}`).pipe(
      catchError((err) => this.handleError(err))
    );
  }


}
