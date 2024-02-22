export interface PokemonFormSprites {
  /** The default depiction of this Pokémon from the front in battle. */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle. */
  back_female: string | null;
  /** The female depiction of this Pokémon from the front in battle. */
  back_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle. */
  back_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle. */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle. */
  front_female: string | null;
  /** The female depiction of this Pokémon from the back in battle. */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle. */
  front_shiny_female: string | null;

  other?: unknown;
  versions?: unknown;
}
