import type { PokemonApiResponse, PaginatedPokemonApiResponse } from "~/types/pokemon"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Link } from "react-router"

type PokemonCardProps = {
  name: string,
  imageUrl: string
}

export default function PokemonCard({ name, imageUrl } : PokemonCardProps ) {
  return (
    <Link to={`/pokemon/${name}`}>
      <Card className='w-64 h-64 cursor-pointer hover:scale-102 focus:scale-102'>
        <CardHeader>
          <CardTitle className='text-center'>{name}</CardTitle>
        </CardHeader>
        <CardContent className='flex place-content-center'>
          <img src={imageUrl} className='h-40' />
        </CardContent>
      </Card>
    </Link>
  )
}
