import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'poke-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent<Resource=unknown> {
  /** List of objects to represent as cards */
  @Input({ required: true }) items!: Resource[];

  /**
   * Helper function to map any resource as a card.
   * If absent will try to cast the item as {@link Card}.
   */
  @Input() map: (item: Resource) => Card = (item) => item as Card;

}
