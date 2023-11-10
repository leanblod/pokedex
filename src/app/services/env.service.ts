import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/** Used for consistency between different environments and mocks */
export interface IEnvironment {
  production: boolean;
  refresh: boolean;
  /** Collection of APIs config */
  apis: {
    [apiName: string]: {
      /** Base URLs SHOULD NOT end with a forward slash (/) */
      baseUrl: string;
      apiKey?: string;
    };
  };
}

/**
 * Environment service.
 * Functions as an extra layer to avoid using the import of the file.
 * Also allows mocking in testing
 */
@Injectable({
  providedIn: 'root'
})
export class EnvService {

  /** Imported environment file */
  private readonly _env: IEnvironment = environment;

  /**
   * Get a shallow copy of the full environment
   */
  get copy() {
    return Object.assign({}, this._env);
  }

  get production() {
    return this._env.production;
  }

  get refresh() {
    return this._env.refresh;
  }

  /** {@link https://pokeapi.co/api/v2 PokeAPI} base URL */
  get pokeUrl() {
    return this._env.apis['poke']?.baseUrl;
  }

}
