export type PaginatedPokemonApiResponse = {
  results: PaginatedPokemonApiResponseResult[];
  count: number;
  next: string;
  previous: string;
};

export type PaginatedPokemonApiResponseResult = {
  name: string;
  url: string;
};

export type PokemonApiResponse = {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  forms: PokemonForm[];
  sprites: PokemonSprites;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
};

export type PokemonForm = {
  name: string;
  url: string;
};

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
    };
  };
};
