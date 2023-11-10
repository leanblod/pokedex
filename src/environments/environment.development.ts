import { IEnvironment } from "@services/env.service";

export const environment: IEnvironment = {
  production: false,
  apis: {
    poke: {
      baseUrl: 'https://pokeapi.co/api/v2',
    }
  }
};
