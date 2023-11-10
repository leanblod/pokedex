import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { Pagination, PokeApiPaginationInfo, PokeApiResponse, QueryStringParams } from '@models/poke-api';
import { mergeMap, of, reduce } from 'rxjs';
import { PokeApiEndpoint, PokeEndpointMapper } from '@models/poke-api-endpoint';

/**
 * General service for all endpoints that share the structure defined in
 * the {@link https://pokeapi.co/docs/v2#resource-listspagination-section 'Resource Lists/Pagination' section}
 * @see {@link https://pokeapi.co/docs/v2 PokeAPI's docs}
 */
@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  /** Base PokeAPI URL */
  protected readonly BASE_URL: string = this.env.pokeUrl;

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) {  }

  protected getUrlFor(endpoint: PokeApiEndpoint) {
    return `${this.BASE_URL}/${endpoint}`;
  }

  getNamedResources(endpoint: PokeApiEndpoint, pagination?: Pagination) {
    return this.http.get<PokeApiResponse>(
      `${this.getUrlFor(endpoint)}${this.setQueryString(pagination)}`
    );
  }

  getListOf<const Endpoint extends PokeApiEndpoint>(endpoint: Endpoint, pagination?: Pagination) {
    /** Individual endpoints response type */
    type Resource = PokeEndpointMapper[Endpoint];

    let paginationInfo: PokeApiPaginationInfo = {
      next: '',
      previous: '',
      count: 0,
    };

    return this.getNamedResources(endpoint, pagination).pipe(
      mergeMap(
        (response) => {
          const results = response.results;
          response.results = [];
          paginationInfo = response as PokeApiPaginationInfo;

          return of(...results.map(resource=>resource.url));
        }
      ),
      mergeMap((url) => this.http.get<Resource>(url)),
      reduce((res, resource)=>{
        res.results.push(resource);
        return res;
      }, Object.assign({results: []}, paginationInfo) as PokeApiResponse<Resource>),
    );
  }

  /**
   * Builds the query string based on the params. If the value is nulish (null
   * or undefined) is parsed as an empty sitrng.
   * @param params List of params to pass to the query string
   * @returns The string to append to the URL (? included)
   */
  protected setQueryString(params?: QueryStringParams) {
    let queryString = '?';
    if(params) {
      for(const key in params) {
        queryString += `${key}=${params[key]??''}`;
      }
    }
    return queryString.length > 1 ? queryString : '';
  }

  /**
   * Requests the data asociated to a resource on the API
   * @param id The API admits either a numeric id or the name of the resource
   * @typedef <Resource> The resource of the response
   * @returns The observable for the request to that resource
   */
  get<Endpoint extends PokeApiEndpoint>(endpoint: Endpoint, id: number | string) {
    return this.http.get<PokeEndpointMapper[Endpoint]>(
      `${this.getUrlFor(endpoint)}/${id}`
    );
  }

}
