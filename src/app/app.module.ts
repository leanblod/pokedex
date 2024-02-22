import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from '@interceptors';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/ui/card/card.component';
import { CardListComponent } from '@components/ui/card-list/card-list.component';
import { HomeComponent } from '@views/home/home.component';
import { EnvService } from '@services/env.service';
import { PokeApiService } from '@services/poke-api.service';
import { PokemonCardListComponent } from './views/pokemon/pokemon-card-list/pokemon-card-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PokemonFormComponent } from './components/forms/pokemon-form/pokemon-form.component';
import { PokemonDetailComponent } from './views/pokemon/pokemon-detail/pokemon-detail.component';
import { NavMenuComponent } from './components/ui/nav-menu/nav-menu.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LoggerService } from '@services/logger.service';
import { Logger } from '@models/logger';
import { ExpansionPanelComponent } from './components/ui/expansion-panel/expansion-panel.component';
import { DetailFieldDirective } from './directives/detail-field.directive';
import { DetailFieldComponent } from './components/forms/detail-field/detail-field.component';
import { ErrorComponent } from './components/forms/error/error.component';
import { HintComponent } from './components/forms/hint/hint.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { AsyncValidationMessageComponent } from './components/forms/async-validation-message/async-validation-message.component';
import { LocalPersistenceService } from '@services/local-persistence.service';
import { ImageSliderComponent } from './components/ui/image-slider/image-slider.component';
import { SearchFieldComponent } from './components/forms/search-field/search-field.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    HomeComponent,
    PokemonCardListComponent,
    CapitalizePipe,
    PokemonFormComponent,
    PokemonDetailComponent,
    NavMenuComponent,
    NotFoundComponent,
    ExpansionPanelComponent,
    DetailFieldDirective,
    DetailFieldComponent,
    ErrorComponent,
    HintComponent,
    SpinnerComponent,
    AsyncValidationMessageComponent,
    ImageSliderComponent,
    SearchFieldComponent,
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
    LoggerService,
    LocalPersistenceService,
    { provide: Logger, useClass: LoggerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
