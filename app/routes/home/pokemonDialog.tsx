import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Badge } from "~/components/ui/badge"
import { data, useLoaderData, useNavigate } from "react-router"
import type { Route } from "./+types/pokemonDialog"
import type { PokemonApiResponse } from "~/types/pokemon"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"


export async function clientLoader({ params } : Route.ClientLoaderArgs) : Promise<PokemonApiResponse> {
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
    return await resp.json()
  } catch (error) {
    throw data({ message: `Pokemon Not Found for search name/id ${params.name}` }, { status: 404 })
  }
}

export default function PokemonDialog() {
  const pokemon = useLoaderData<typeof clientLoader>()
  const navigate = useNavigate()

  function handleOpenChange() {
    return navigate('/')
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle className="text-center">{pokemon.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center h-48">
            <img className="h-full" src={String(pokemon.sprites.other?.dream_world?.front_default)} />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map(({ type }) => (
              <Badge variant='default'>{type.name}</Badge>
            ))}
          </div>
          <Tabs defaultValue="abilities" className="items-center">
            <TabsList>
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="moves">Moves</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>
            <TabsContent value="abilities" className="max-h-24 overflow-scroll self-start w-full">
              <ul className="list-disc">
                {pokemon.abilities.map(({ ability }) => (
                  <a href={ability.url} target="_blank" rel="noopener noreferrer">
                    <li key={ability.name}>{ability.name}</li>
                  </a>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="moves" className="max-h-24 overflow-scroll self-start w-full">
              <ul className="list-disc">
                {pokemon.moves.map(({ move }) => (
                  <a href={move.url} target="_blank" rel="noopener noreferrer">
                    <li key={move.name}>{move.name}</li>
                  </a>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="forms" className="max-h-24 overflow-scroll self-start w-full">
              <ul className="list-disc">
                {pokemon.forms.map(({ name, url }) => (
                  <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
