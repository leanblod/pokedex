import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() color: string = 'blue';
}
