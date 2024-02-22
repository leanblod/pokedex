import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  control = new FormControl<number>(0);

}
