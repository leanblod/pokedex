import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { Card } from '../../../components/ui/card/card.component';
import { PokeApiService } from '@services/poke-api.service';
import { EnvService } from '@services/env.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, iif, map, mergeMap, of, timer } from 'rxjs';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';

@Component({
  selector: 'pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
})
export class PokemonCardListComponent implements OnInit {

  cards?: Observable<Card[]>;

  constructor(
    private pokeApiService: PokeApiService,
    private env: EnvService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cards = iif(()=>this.env.refresh, timer(0, 5000), of(null)).pipe(
      mergeMap((time) => {
        return time ?
          // Update list
          this.pokeApiService.getListOf(PokeApiEndpoint.Pokemon) :
          // Resolved list
          this.activatedRoute.data.pipe(
            map(({ pokemon }) => pokemon as Pokemon[]),
          );
      }),
      map((list)=>list.map(this.cardMapper)),
    );
  }

  /** Map the Pokemon resource model to a card */
  cardMapper(item: Pokemon): Card {
    const description: string =
    `Id: ${item.id}`.concat('\n',
    `Base experience: ${item.base_experience}`,'\n',
    `Height: ${item.height}`);

    return {
      id: item.id,
      name: item.name,
      img: item.sprites.front_default,
      description,
    };
  }

  openDetail(card: Card) {
    this.router.navigate([PokeApiEndpoint.Pokemon, card.id]);
  }

}
