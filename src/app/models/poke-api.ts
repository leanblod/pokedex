/**
 * General pagination information
 */
export interface PokeApiPaginationInfo {
  /** The total number of resources available from this API. */
  count: number;
  /** The URL for the next page in the list. */
  next: string;
  /** The URL for the previous page in the list. */
  previous: string;
}

/**
 * General response structure used by all endpoints
 * @see {@link https://pokeapi.co/docs/v2 PokeAPI's docs}
 */
export interface PokeApiResponse<Resource=NamedApiResource>
  extends PokeApiPaginationInfo {
  /** A list of named API resources. */
  results: Resource[];
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface QueryStringParams {
  [key: string|number]: string|number|undefined
}

export interface Pagination extends QueryStringParams {
  limit?: number;
  offset?: number;
}
