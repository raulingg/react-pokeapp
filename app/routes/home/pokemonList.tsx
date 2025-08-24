import { useFetcher, useLoaderData } from 'react-router'
import { SEARCH_POKEMON_FORM_KEY, type clientAction } from './home'
import PokemonCard from '~/components/ui/pokemonCard'
import Loading from '~/components/ui/Loading'
import type { PokemonApiResponseWithBasicProps } from '~/types/pokemon'


export async function clientLoader() : Promise<PokemonApiResponseWithBasicProps[]> {
  try {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon')
    const { results } = await resp.json() 
    return results
  } catch (error) {
    return []
  }
}

export function shouldRevalidate() {
  return false;
}

export default function PokemonList() {
  const fetcher = useFetcher<typeof clientAction>( { key: SEARCH_POKEMON_FORM_KEY });
  const data = useLoaderData<typeof clientLoader>()
  const pokemonList = fetcher.data ?? data

  function handleCardClick() {
    // TODO: Open detail view modal
  }

  if (fetcher.state === 'submitting') {
    return <Loading />
  }

  if (!pokemonList || pokemonList.length === 0) {
    return <p>Pokemon not found</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} onClick={handleCardClick} />
      ))}
    </div>
  )
}
