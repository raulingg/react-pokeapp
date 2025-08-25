import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { data, useLoaderData, useNavigate } from 'react-router';
import type { Route } from './+types/pokemonDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { getPokemon } from '~/services/apiClient';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const resp = await getPokemon(params.name);
    return resp;
  } catch (error) {
    throw data(
      { message: `Pokemon Not Found for search name/id ${params.name}` },
      { status: 404 }
    );
  }
}

export default function PokemonDialog() {
  const pokemon = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();

  function handleOpenChange() {
    return navigate(-1);
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-80"
        aria-description={`Detail view for "${pokemon.name}" pokemon`}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{pokemon.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center h-48">
            <img
              className="h-full"
              src={String(pokemon.sprites.other?.dream_world?.front_default)}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map(({ type }) => (
              <Badge key={type.name} variant="default">
                {type.name}
              </Badge>
            ))}
          </div>
          <Tabs defaultValue="abilities" className="items-center">
            <TabsList>
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="moves">Moves</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>
            <TabsContent
              value="abilities"
              className="max-h-24 overflow-scroll self-start w-full"
            >
              <ul className="list-disc">
                {pokemon.abilities.map(({ ability }) => (
                  <li key={ability.name}>
                    <a
                      href={ability.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ability.name}
                    </a>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="moves"
              className="max-h-24 overflow-scroll self-start w-full"
            >
              <ul className="list-disc">
                {pokemon.moves.map(({ move }) => (
                  <li key={move.name}>
                    <a
                      href={move.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {move.name}
                    </a>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="forms"
              className="max-h-24 overflow-scroll self-start w-full"
            >
              <ul className="list-disc">
                {pokemon.forms.map(({ name, url }) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
