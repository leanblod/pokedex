import { Component } from '@angular/core';
import { Link } from '@components/ui/nav-menu/nav-menu.component';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { EnvService } from '@services/env.service';
import { LocalPersistenceService } from '@services/local-persistence.service';

@Component({
  selector: 'poke-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  static title = 'Pokedex';

  pokeApiEndpoints: Link[] = Object.entries(PokeApiEndpoint)
    .map((endpoint)=>({ title: endpoint[0] , routerLink: endpoint[1] }));

  constructor(
    private env: EnvService,
    private localPersistenceService: LocalPersistenceService,
  ) {}

  public get production() {
    return this.env.production;
  }

  public resetChanges() {
    this.localPersistenceService.clearStorage();
  }
}
