import { Component, OnInit } from '@angular/core';
import { PokeApiResponse } from '@models/poke-api';
import { PokeApiEndpoint } from '@models/poke-api-endpoint';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { PokeApiService } from '@services/poke-api.service';
import { Observable, map, mergeMap, timer } from 'rxjs';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public pokeApiResponse?: Observable<Pokemon[]>;

  /**
   * Data relevant for paginating the list.
   * @todo Implement pagination
   */
  public listData?: {
    next: PokeApiResponse['next'],
    previous: PokeApiResponse['previous'],
    count: PokeApiResponse['count'],
  };

  constructor(
    private pokeApiService: PokeApiService,
  ) {}

  ngOnInit(): void {
    this.pokeApiResponse = timer(0, 5000).pipe(
      mergeMap(()=>this.pokeApiService.getListOf(PokeApiEndpoint.Pokemon)),
      map((response)=>response.results),
    );
  }

}
