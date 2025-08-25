import { Outlet, useFetcher } from 'react-router';
import PokeballIcon from '~/assets/pokeball.svg';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import type { Route } from './+types/home';
import { wait } from '~/lib/utils';
import { getPokemon } from '~/services/apiClient';

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const searchTerm = String(formData.get('search'));

  if (!searchTerm) {
    return [];
  }

  try {
    // delay request so we can see Loading state. Just for demo purposes
    await wait(2000);
    const pokemon = await getPokemon(searchTerm);

    return [pokemon];
  } catch (error) {
    return [];
  }
}

export const SEARCH_POKEMON_FORM_KEY = 'searchPokemon';

export default function Home() {
  const fetcher = useFetcher<typeof clientAction>({
    key: SEARCH_POKEMON_FORM_KEY,
  });

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16">
        <header className="flex items-center gap-4">
          <h1 className="text-5xl">Pokeapp</h1>
          <img src={PokeballIcon} alt="Pokeapp icon" className="w-16" />
        </header>
        <fetcher.Form
          method="post"
          className="flex w-full justify-center max-w-xl px-8 gap-2"
        >
          <Input
            id="search"
            name="search"
            type="search"
            placeholder="Pikachu"
            className="w-full"
          />
          <Button type="submit">Search</Button>
        </fetcher.Form>
        <div className="grid content-center items-center min-h-80">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
