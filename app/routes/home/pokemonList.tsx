import { data, useFetcher, useLoaderData, useNavigate } from 'react-router'
import { SEARCH_POKEMON_FORM_KEY, type clientAction } from './home'
import PokemonCard from '~/components/ui/pokemonCard'
import Loading from '~/components/ui/Loading'
import type { PokemonApiResponse, PokemonApiResponseWithBasicProps } from '~/types/pokemon'


export async function clientLoader() : Promise<PokemonApiResponseWithBasicProps[]> {
  try {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon')
    const { results } = await resp.json() 
    return results
  } catch (error) {
    throw data({ message: 'Oops! Something went wrong when loading pokemon list. Try to reload the page'}, { status: 404 })
  }
}

export function shouldRevalidate() {
  return false;
}

export default function PokemonList() {
  const navigate = useNavigate()
  const fetcher = useFetcher<typeof clientAction>( { key: SEARCH_POKEMON_FORM_KEY });
  const data = useLoaderData<typeof clientLoader>()
  const pokemonList = fetcher.data ?? data

  if (fetcher.state === 'submitting') {
    return <Loading />
  }

  if (!pokemonList || pokemonList.length === 0) {
    return <p>Pokemon not found</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  )
}
