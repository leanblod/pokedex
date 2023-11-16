import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  @Input() expanded?: boolean;

  toggle() {
    this.expanded = !this.expanded;
  }

}
