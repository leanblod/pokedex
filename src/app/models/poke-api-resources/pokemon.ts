export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number,
  is_default: boolean,
  order: number,
  weight: number,
  abilities: unknown[],
  forms: unknown[],
  game_indices: unknown[],
  held_items: unknown[],
  location_area_encounters: string,
  moves: unknown[],
  past_types: unknown[],
  sprites: PokemonFormSprite,
  species: unknown,
  stats: unknown[],
  types: unknown[],
}

interface PokemonFormSprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
