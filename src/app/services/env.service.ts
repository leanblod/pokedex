import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/** Used for consistency between different environments and mocks */
export interface IEnvironment {
  production: boolean;
  refresh: boolean;
  localCache: boolean;
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
  private static readonly _env: IEnvironment = environment;

  /**
   * Get a deep copy of the full environment from a static context
   * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy Deep copy - MDN}
   */
  static get env() {
    return JSON.parse(JSON.stringify(EnvService._env)) as IEnvironment;
  }

  /**
   * Get a deep copy of the full environment
   * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy Deep copy - MDN}
   */
  get copy() {
    return JSON.parse(JSON.stringify(EnvService._env)) as IEnvironment;
  }

  get production() {
    return this.copy.production;
  }

  get refresh() {
    return this.copy.refresh;
  }

  get localCache() {
    return this.copy.localCache;
  }

  /** {@link https://pokeapi.co/api/v2 PokeAPI} base URL */
  get pokeUrl() {
    return this.copy.apis['poke']?.baseUrl;
  }

}
