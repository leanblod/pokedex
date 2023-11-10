import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiResponse } from '@models/poke-api';
import { Pokemon } from '@models/poke-api-resources/pokemon';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pokeApiResponse?: PokeApiResponse<Pokemon>;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pokemon })=> {
      this.pokeApiResponse = pokemon;
    });
  }

}
