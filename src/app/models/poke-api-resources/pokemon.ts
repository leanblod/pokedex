import { NamedApiResource } from "@models/poke-api";
import { VersionGameIndex } from "./utility";
import { PokemonFormSprites } from "./pokemon-forms";

/**
 * Pokémon are the creatures that inhabit the world of the Pokémon games.
 * They can be caught using Pokéballs and trained by battling with other Pokémon.
 * Each Pokémon belongs to a specific species but may take on a variant which
 * makes it differ from other Pokémon of the same species, such as base stats,
 * available abilities and typings.
 * @see {@link https://pokeapi.co/docs/v2#pokemon PokeAPI's docs - Pokemon}
 * @see {@link http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species) Bulbapedia}
 */
export interface Pokemon {
  /** The identifier for this resource. */
  id: number;
  /** The name for this resource. */
  name: string;
  /** The base experience gained for defeating this Pokémon. */
  base_experience: number;
  /** The height of this Pokémon in decimetres. */
  height: number,
  /** Set for exactly one Pokémon used as the default for each species. */
  is_default: boolean,
  /** Order for sorting. Almost national order, except families are grouped together. */
  order: number,
  /** The weight of this Pokémon in hectograms. */
  weight: number,
  /** A list of abilities this Pokémon could potentially have. */
  abilities: PokemonAbility[],
  /** A list of forms this Pokémon can take on. */
  forms: NamedApiResource[],
  /** A list of game indices relevent to Pokémon item by generation. */
  game_indices: VersionGameIndex[],
  /** A list of items this Pokémon may be holding when encountered. */
  held_items: PokemonHeldItem[],
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions. */
  location_area_encounters: string,
  /** A list of moves along with learn methods and level details pertaining to specific version groups. */
  moves: PokemonMove[],
  /** A list of details showing types this pokémon had in previous generations */
  past_types: PokemonTypePast[],
  /** A set of sprites used to depict this Pokémon in the game. A visual representation of the various sprites can be found at PokeAPI/sprites */
  sprites: PokemonFormSprites,
  /** The species this Pokémon belongs to. */
  species: NamedApiResource,
  /** A list of base stat values for this Pokémon. */
  stats: PokemonStat[],
  /** A list of details showing types this Pokémon has. */
  types: PokemonType[],
}

/* Model specific sub-interfaces */

interface PokemonAbility {
  /** Whether or not this is a hidden ability. */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokémon species. */
  slot: number;
  /** The ability the Pokémon may have. */
  ability: NamedApiResource;
}

interface PokemonHeldItem {
  /** The item the referenced Pokémon holds. */
  item: NamedApiResource;
  /** The details of the different versions in which the item is held. */
  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  /** The version in which the item is held. */
  version: NamedApiResource;
  /** How often the item is held. */
  rarity: number;
}

interface PokemonMove {
  /** The move the Pokémon can learn. */
  move: NamedApiResource;
  /** The details of the version in which the Pokémon can learn the move. */
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  /** The method by which the move is learned. */
  move_learn_method: NamedApiResource;
  /** The version group in which the move is learned. */
  version_group: NamedApiResource;
  /** The minimum level to learn the move. */
  level_learned_at: number;
}

interface PokemonStat {
  /** The stat the Pokémon has. */
  stat: NamedApiResource;
  /** The effort points (EV) the Pokémon has in the stat. */
  effort: number;
  /** The base value of the stat. */
  base_stat: number;
}

interface PokemonTypePast {
  /** The last generation in which the referenced pokémon had the listed types. */
  generation: NamedApiResource;
  /** The types the referenced pokémon had up to and including the listed generation. */
  types: PokemonType[]
}

interface PokemonType {
  /** The order the Pokémon's types are listed in. */
  slot: number;
  /** The type the referenced Pokémon has. */
  type: NamedApiResource;
}
