import { Component } from '@angular/core';
import { EnvService } from '@services/env.service';

@Component({
  selector: 'poke-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  static title = 'Pokedex';

  private response: unknown;

  constructor(
    private env: EnvService,
  ) {}

  public get production() {
    return this.env.production;
  }
}
