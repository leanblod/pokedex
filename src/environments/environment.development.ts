import { IEnvironment } from "@services/env.service";

export const environment: IEnvironment = {
  production: false,
  refresh: false,
  localCache: false,
  apis: {
    poke: {
      baseUrl: 'https://pokeapi.co/api/v2',
    }
  }
};
