import { IEnvironment } from '@services/env.service';

export const environment: IEnvironment = {
  production: true,
  apis: {
    poke: {
      baseUrl: 'https://pokeapi.co/api/v2',
    }
  }
};
