import type { PokemonApiResponse, PokemonApiResponseWithBasicProps } from "~/types/pokemon"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

type PokemonCardProps = {
  pokemon: PokemonApiResponse | PokemonApiResponseWithBasicProps
  onClick: (event: React.SyntheticEvent) => void
}
export default function PokemonCard({ pokemon, onClick } : PokemonCardProps ) {
  const { name } = pokemon
  const src = getPokemonImageSrc(pokemon)

  return (
    <Card onClick={onClick} className='w-64 h-64'>
      <CardHeader>
        <CardTitle className='text-center'>{name}</CardTitle>
      </CardHeader>
      <CardContent className='flex place-content-center'>
        <img src={src} className='h-40' />
      </CardContent>
    </Card>
  )
}

export function getPokemonImageSrc(pokemon: PokemonApiResponse | PokemonApiResponseWithBasicProps) {
  let id

  if ('url' in pokemon) {
    const [, unsanitizedId] = pokemon.url.split('pokemon/')
    id = unsanitizedId.replace('/', '').toString()
  } else {
    id = pokemon.id
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
}
