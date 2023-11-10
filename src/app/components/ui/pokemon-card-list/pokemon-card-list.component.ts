import { Component, Input } from '@angular/core';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { Card } from '../card/card.component';

@Component({
  selector: 'pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
})
export class PokemonCardListComponent {

  @Input({ required: true }) items!: Pokemon[];

  map(item: Pokemon): Card {
    return {
      name: item.name,
      img: item.sprites.front_default,
      description: 'none... for now...',
    };
  }

}