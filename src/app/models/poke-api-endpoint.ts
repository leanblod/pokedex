import { Berry } from "./poke-api-resources/berry";
import { Pokemon } from "./poke-api-resources/pokemon";

/**
 * List of endpoints to map to the resource types
 * @see {@link PokeEndpointMapper} (mapping to resource model)
 */
export enum PokeApiEndpoint {
  Pokemon='pokemon',
  Berry='berry',
}

/**
 * Use this type for mapping the endpoint to the resource model
 * @see {@link PokeApiEndpoint} (endpoint titles)
 */
export type PokeEndpointMapper = {
  [Endpoint in PokeApiEndpoint]: {
    [PokeApiEndpoint.Pokemon]: Pokemon;
    [PokeApiEndpoint.Berry]: Berry;
  }[Endpoint];
}
