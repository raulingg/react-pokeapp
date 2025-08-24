export type PokemonApiResponseWithBasicProps = {
  name: string,
  url: string
}

export type PokemonApiResponse = {
  id: number,
  name: string,
  sprites: PokemonSprites
}

export type PokemonSprites = {
  front_default: string | null,
  front_shiny: string | null,
  front_female: string | null,
  front_shiny_female: string | null,
  back_default: string | null,
  back_shiny: string | null,
  back_female: string | null,
  back_shiny_female: string | null
  other: {
    dream_world?: PokemonSprites
  }
}
