import type { PokemonApiResponse, PokemonApiResponseWithBasicProps } from "~/types/pokemon"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Link } from "react-router"

type PokemonCardProps = {
  pokemon: PokemonApiResponse | PokemonApiResponseWithBasicProps,
}

export default function PokemonCard({ pokemon } : PokemonCardProps ) {
  const { name } = pokemon
  const src = getPokemonImageSrc(pokemon)

  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card className='w-64 h-64 cursor-pointer hover:scale-102 focus:scale-102'>
        <CardHeader>
          <CardTitle className='text-center'>{name}</CardTitle>
        </CardHeader>
        <CardContent className='flex place-content-center'>
          <img src={src} className='h-40' />
        </CardContent>
      </Card>
    </Link>
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
