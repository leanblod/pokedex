import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from '@interceptors/index';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/ui/card/card.component';
import { CardListComponent } from '@components/ui/card-list/card-list.component';
import { HomeComponent } from '@views/home/home.component';
import { EnvService } from '@services/env.service';
import { PokeApiService } from '@services/poke-api.service';
import { PokemonCardListComponent } from './components/ui/pokemon-card-list/pokemon-card-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    HomeComponent,
    PokemonCardListComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders,
    EnvService,
    PokeApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
