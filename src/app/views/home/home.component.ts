import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiResponse } from '@models/poke-api';
import { Pokemon } from '@models/poke-api-resources/pokemon';
import { Observable, map } from 'rxjs';

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
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.pokeApiResponse = this.activatedRoute.data.pipe(
      map(({ pokemon }) => {
        const res = pokemon as PokeApiResponse<Pokemon>;
        this.listData = Object.assign({}, res as ({
          next: PokeApiResponse['next'],
          previous: PokeApiResponse['previous'],
          count: PokeApiResponse['count'],
        }));
        return res.results;
      }),
    );
  }

}
