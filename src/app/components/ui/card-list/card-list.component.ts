import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'poke-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  /** List of objects to represent as cards */
  @Input({
    required: true,
    transform: (value: Card[]|null) => value??[],
  }) cards!: Card[];

  @Output() select: EventEmitter<Card> = new EventEmitter<Card>();

}
