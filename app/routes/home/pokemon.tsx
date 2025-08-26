import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { data, useLoaderData, useNavigate } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { getPokemon } from '~/services/apiClient';
import { wait } from '~/lib/utils';
import type { Route } from './+types/pokemon';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');

  if (!searchTerm) {
    return null;
  }

  try {
    // delay request so we can see Loading state. Just for demo purposes
    await wait(1000);
    const pokemon = await getPokemon(searchTerm);
    return pokemon;
  } catch (error) {
    return {
      error: `Pokemon "${searchTerm}" not found. Try searching with a different term`,
    };
  }
}

export default function Pokemon() {
  const data = useLoaderData<typeof clientLoader>();

  if (!data) {
    return null;
  }

  if ('error' in data) {
    return <p>{data.error}</p>;
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="w-80"
        aria-description={`Detail view for "${data.name}" pokemon`}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{data.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center h-48">
            <img
              className="h-full"
              src={String(data.sprites.other?.dream_world?.front_default)}
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {data.types.map(({ type }) => (
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
                {data.abilities.map(({ ability }) => (
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
                {data.moves.map(({ move }) => (
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
                {data.forms.map(({ name, url }) => (
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
