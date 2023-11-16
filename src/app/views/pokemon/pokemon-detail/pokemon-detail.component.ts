import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { PokeApiService } from '@services/poke-api.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {

  readonly pokemon: Observable<Pokemon>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
  ) {
    this.pokemon = this.activatedRoute.data.pipe(
      map(({ pokemon }) => pokemon as Pokemon),
    );
  }

  save(pokemon: Pokemon) {
    this.pokeApiService.put(PokeApiEndpoint.Pokemon, pokemon).subscribe({
      next: () => alert('The changes to the Pokemon have been correctly applied'),
      error: () => alert('There was an error, the changes to the Pokemon could not be applied'),
    });
  }
}
