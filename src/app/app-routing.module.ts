import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LayoutComponent,
  PokemonDetailsComponent,
  PokemonListComponent,
  PlaceholderComponent
} from './components/';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent,
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetailsComponent,
      },
      {
        path: 'error',
        component: PlaceholderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

