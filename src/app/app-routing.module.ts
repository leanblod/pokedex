import { Component, NgModule } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { PokemonCardListComponent } from '@views/pokemon/pokemon-card-list/pokemon-card-list.component';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { HomeComponent } from '@views/home/home.component';
import { PokemonDetailComponent } from '@views/pokemon/pokemon-detail/pokemon-detail.component';
import { pokemonResolver } from '@views/pokemon/pokemon.resolver';
import { NotFoundComponent } from '@views/not-found/not-found.component';
import { AppComponent } from './app.component';
import { ViewType } from '@models/view-type';

@Component({template: '<h2>Te la creíste wey xD</h2>', standalone: true , styles: [ 'h2{color: transparent; background-image: linear-gradient(transparent, #F00, #FF0, #0F0, #00F, #F0F, transparent); background-clip: text; }' ]}) class TeLaCreisteWey {}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: parentTitleAppend('Home'),
    component: HomeComponent,
  },
  {
    path: PokeApiEndpoint.Pokemon,
    title: 'Pokemon',
    children: [
      {
        path: '',
        title: parentTitleAppend('List'),
        component: PokemonCardListComponent,
        resolve: {
          pokemon: pokemonResolver[ViewType.List],
        }
      },
      {
        path: ':id',
        title: parentTitleAppend('Detail'),
        component: PokemonDetailComponent,
        resolve: {
          pokemon: pokemonResolver[ViewType.Detail],
        },
      },
    ],
  },
  {
    path: PokeApiEndpoint.Berry,
    title: 'Berries',
    component: TeLaCreisteWey,
  },
  {
    path: '**',
    title: parentTitleAppend('Page not found'),
    component: NotFoundComponent,
  }
];

/**
 * @param text Subtitle to append
 * @param separator Separator between parent and child titles
 * @returns The title of the parent {@link Route} with the separator and
 * subtitle appended respectivley
 */
function parentTitleAppend(text?: string, separator: string = ' - '): ResolveFn<string> {
  return (snapshot) => {
    const currentTitle = snapshot.parent?.title??AppComponent.title;
    return text ?
      `${currentTitle}${separator}${text}` :
      currentTitle;
  };
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
