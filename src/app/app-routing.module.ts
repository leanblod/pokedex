import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeApiEndpoint } from '@models/poke-api';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { PokeApiService } from '@services/poke-api.service';
import { HomeComponent } from '@views/home/home.component';

const routes: Routes = [
  {
    path: '' ,
    pathMatch: 'full' ,
    title: 'Home' ,
    component: HomeComponent ,
    resolve: {
      pokemon: () => inject(PokeApiService).getListOf<Pokemon>(PokeApiEndpoint.Pokemon),
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
