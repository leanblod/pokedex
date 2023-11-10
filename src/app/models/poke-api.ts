import { Pokemon } from "./poke-api-resources/pokemon";

/**
 * General response structure used by all endpoints
 * @see {@link https://pokeapi.co/docs/v2 PokeAPI's docs}
 */
export interface PokeApiResponse<Resource=NamedApiResource> {
  /** The total number of resources available from this API. */
  count: number;
  /** The URL for the next page in the list. */
  next: string;
  /** The URL for the previous page in the list. */
  previous: string;
  /** A list of named API resources. */
  results: Resource[];
}

export interface NamedApiResource {
  name: string;
  url: string;
}

/**
 * List of endpoints to map to the resource types
 */
export enum PokeApiEndpoint {
  Pokemon='pokemon',
}

export interface QueryStringParams {
  [key: string|number]: string|number|undefined
}

export interface Pagination extends QueryStringParams {
  limit?: number;
  offset?: number;
}

// TODO - Revisar este tipo para validar mapeos
export type PokeEndpointMapper = {
  [Endpoint in PokeApiEndpoint]: {
    [PokeApiEndpoint.Pokemon]: Pokemon;
  }[PokeApiEndpoint];
}
