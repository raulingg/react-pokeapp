import type { PokemonApiResponse, PaginatedPokemonApiResponse } from "~/types/pokemon"

const API_URL = 'https://pokeapi.co/api/v2'
const POKEMON_ENDPOINT_URL = `${API_URL}/pokemon`
const PAGINATION_LIMIT = 20

/**
 * Get a list of pokemons paginated @see https://pokeapi.co/docs/v2#resource-listspagination-section 
 */
export async function getPaginatedPokemonList(url?: string) : Promise<PaginatedPokemonApiResponse> {
  const resp = await fetch(url || `${POKEMON_ENDPOINT_URL}?limit=${PAGINATION_LIMIT}`)
  const data = await resp.json()
  return data
}

/**
 * Get pokemon data (id, forms, abilities, sprites, moves, etc) @see https://pokeapi.co/docs/v2#pokemon 
 * @param id Pokemon name or id
 */
export async function getPokemon(id: string | number) : Promise<PokemonApiResponse> {
  const resp = await fetch(`${POKEMON_ENDPOINT_URL}/${id}`)
  const data = await resp.json()

  return data
}
