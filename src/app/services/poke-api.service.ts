import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Inject, Injectable } from '@angular/core';
import { Pagination, PokeApiPaginationInfo, PokeApiResponse, QueryStringParams } from '@models/poke-api';
import { Subject, mergeMap, of, reduce, tap } from 'rxjs';
import { PokeApiEndpoint, PokeEndpointMapper } from '@models/poke-api-endpoint';
import { Logger } from '@models/logger';
import { LocalPersistenceService } from './local-persistence.service';

type PersistedEndpoints = {
  [Endpoint in PokeApiEndpoint]?: {
    [key: number | string]: PokeEndpointMapper[Endpoint];
  }
}

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

  private readonly STORAGE_KEY: string = 'PokeApiResource';

  private getLocalResource<Endpoint extends PokeApiEndpoint>(endpoint: Endpoint, id: string|number) {
    const persistedEndpoints = this.localPersistenceService
      .readItem<PersistedEndpoints>(this.STORAGE_KEY);
    const resources = persistedEndpoints ?
    persistedEndpoints[endpoint] :
    null;
    return resources ?
      resources[id]??null :
      null;
  }

  private setLocalResource<Endpoint extends PokeApiEndpoint>(endpoint: Endpoint, resource: PokeEndpointMapper[Endpoint]) {
    const persistedEndpoints = this.localPersistenceService
      .readItem<PersistedEndpoints>(this.STORAGE_KEY);

    if(persistedEndpoints) {
      const item = {
        [endpoint]: {
          [resource.id]: resource,
        },
      };

      Object.assign(persistedEndpoints, item);
      this.localPersistenceService.persistItem(this.STORAGE_KEY, persistedEndpoints);
    }
  }

  paginationInfo: Subject<PokeApiPaginationInfo> = new Subject<PokeApiPaginationInfo>();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    @Inject(Logger)
    private logger: Logger,
    private localPersistenceService: LocalPersistenceService
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

    return this.getNamedResources(endpoint, pagination).pipe(
      mergeMap(
        (response) => {
          const results = response.results;
          response.results = [];
          this.paginationInfo.next(response as PokeApiPaginationInfo);

          return of(...results.map(resource=>resource.url));
        }
      ),
      mergeMap((url) => this.http.get<Resource>(url)),
      reduce((res, resource)=>{
        res.push(resource);
        return res;
      }, [] as Resource[]),
      tap({
        next: () => this.logger.info.success(`${endpoint} endpoint`, 'List retrieved successfully'),
        error: (err) => this.logger.info.failed(`${endpoint} endpoint`, "The list couldn't be fetched", err),
      }),
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
    const persistedResource = this.getLocalResource(endpoint, id);
    return persistedResource?
      of(persistedResource) :
      this.http.get<PokeEndpointMapper[Endpoint]>(
        `${this.getUrlFor(endpoint)}/${id}`
      );
  }

  put<Endpoint extends PokeApiEndpoint>(endpoint: Endpoint, data: PokeEndpointMapper[Endpoint]) {
    alert("Now I'd send the data with the appropriate structure in a PUT request...\nIf the API supported it -_-'");
    this.setLocalResource(endpoint, data);
    return of(true);
  }

}
