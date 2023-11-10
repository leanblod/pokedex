import { Component, Input } from '@angular/core';

/**
 * Interface for mapping resources to represent as cards.
 * @see {@link CardComponent}
 */
export interface Card {
  name: string;
  /** Image URL, if null the image won't show */
  img?: unknown | null;
  alt?: string;
  description?: string;
}

@Component({
  selector: 'poke-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  /** Resource you want to represent */
  @Input({ required: true }) card!: Card;

  readonly noImage = '/assets/no_image_available.png';
}
