import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderService } from './services';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import {
  LayoutComponent,
  PokemonDetailsComponent,
  SearchInputComponent,
  PokemonListComponent,
  PokemonListItemComponent,
  PaginationComponent,
  PlaceholderComponent,
  LoaderComponent
} from './components';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SearchInputComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    PaginationComponent,
    PlaceholderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
