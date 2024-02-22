import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { PokeApiEndpoint } from "@models/poke-api-endpoint";
import { PokeApiService } from "@services/poke-api.service";
import { ViewType } from "@models/view-type";
import { throwError } from "rxjs";


export const pokemonResolver: { [resolver: string]: ResolveFn<unknown> } = {
  [ViewType.List]() {
    return inject(PokeApiService).getListOf(PokeApiEndpoint.Pokemon);
  },

  [ViewType.Detail](route) {
    const id = route.paramMap.get('id');
    return id ?
      inject(PokeApiService).get(PokeApiEndpoint.Pokemon, id) :
      throwError(() => new Error("Invalid path param 'id'"));
  },
};
