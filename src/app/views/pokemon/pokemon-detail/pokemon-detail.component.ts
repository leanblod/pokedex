import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@models/logger';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { PokeApiService } from '@services/poke-api.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {

  readonly pokemon: Observable<Pokemon>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    @Inject(Logger) private logger: Logger,
  ) {
    this.pokemon = this.activatedRoute.data.pipe(
      map(({ pokemon }) => pokemon as Pokemon),
    );
  }

  save(pokemon: Pokemon) {
    const TITLE = 'Edit Pokemon';
    this.pokeApiService.put(PokeApiEndpoint.Pokemon, pokemon).subscribe({
      next: (value)=> {
        if(value) this.logger.info.success(TITLE, 'Successful operation');
        else this.logger.info.failed(TITLE, 'There is an error');
      },
      error: ()=>this.logger.info.failed(TITLE, 'There is an even more error'),
    });
  }
}
