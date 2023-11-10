import { Berry } from "./poke-api-resources/berry";
import { Pokemon } from "./poke-api-resources/pokemon";

/**
 * List of endpoints to map to the resource types
 */
export enum PokeApiEndpoint {
  Pokemon='pokemon',
  Berry='berry',
}

/**
 * @todo Use this type for mapping the endpoint to the resource model
 */
export type PokeEndpointMapper = {
  [Endpoint in PokeApiEndpoint]: {
    [PokeApiEndpoint.Pokemon]: Pokemon;
    [PokeApiEndpoint.Berry]: Berry;
  }[Endpoint];
}
