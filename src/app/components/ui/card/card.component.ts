import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CapitalizationType } from 'src/app/pipes/capitalize.pipe';

/**
 * Interface for mapping resources to represent as cards.
 * @see {@link CardComponent}
 */
export interface Card {
  id: string | number;
  name: string;
  /** Image URL, if null the image won't show */
  img?: unknown | null;
  alt?: string;
  description?: string;
}

type FullCardConfig = {
  capitalize: {
    [field in 'title' | 'description']?: CapitalizationType;
  };
  show: {
    id: 'text' | 'number' | null | ((id: Card['id']) => unknown);
    img: boolean;
  }
};

export type CardConfig = Partial<FullCardConfig>;

@Component({
  selector: 'poke-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {

  @Input({ required: true }) card!: Card;

  @Input({
    alias: 'config',
    required: false,
  }) private userConfig?: CardConfig;

  config: FullCardConfig = this.getDefaultConfig(this.card);

  readonly noImage = '/assets/no_image_available.png';

  private getDefaultConfig(card?: Card): FullCardConfig {
    return {
      capitalize: {
        title: 'word',
        description: 'text',
      },
      show: {
        id: typeof card?.id === 'number' ?
          'number' : 'text',
        img: typeof card?.img === 'string',
      }
    };
  }

  callIfCallable(callback: unknown, ...args: unknown[]) {
    if(typeof callback === 'function') {
      return callback.apply(this, args);
    } else {
      return args[0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['card'] || changes['config']) {

      // Update config if the card changes
      if(changes['card'])
        Object.assign(this.config, this.getDefaultConfig(this.card));

      // Update user config
      Object.assign(this.config, this.userConfig);
    }
  }

}
