import {
  data,
  useFetcher,
  useLoaderData,
  useSearchParams,
  type ShouldRevalidateFunctionArgs,
} from 'react-router';
import { SEARCH_POKEMON_FORM_KEY, type clientAction } from './home';
import PokemonCard from '~/components/ui/pokemonCard';
import Loading from '~/components/ui/Loading';
import { getPokemonImageSrc } from '~/lib/utils';
import { getPaginatedPokemonList } from '~/services/apiClient';
import PokemonPagination from '~/components/ui/pokemonPagination';
import type { Route } from './+types/pokemonList';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get('offset'));

  if (isNaN(offset)) {
    throw data({ message: 'Invalid pagination url param' }, { status: 404 });
  }

  try {
    const data = await getPaginatedPokemonList(offset);
    return data;
  } catch (error) {
    throw data(
      {
        message:
          'Oops! Something went wrong when loading pokemon list. Try to reload the page',
      },
      { status: 404 }
    );
  }
}

export function shouldRevalidate({
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) {
  return currentUrl.href !== nextUrl.href;
}

export default function PokemonList() {
  const fetcher = useFetcher<typeof clientAction>({
    key: SEARCH_POKEMON_FORM_KEY,
  });
  const { results, previous, next } = useLoaderData<typeof clientLoader>();
  const pokemonList = fetcher.data ?? results;
  const nextOffset = getOffset(next);
  const prevOffset = getOffset(previous);

  if (fetcher.state === 'submitting') {
    return <Loading />;
  }

  if (!pokemonList || pokemonList.length === 0) {
    return <p>Pokemon not found</p>;
  }

  return (
    <>
      <PokemonPagination next={nextOffset} prev={prevOffset} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4 pt-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            imageUrl={getPokemonImageSrc(pokemon)}
          />
        ))}
      </div>
      <PokemonPagination next={nextOffset} prev={prevOffset} />
    </>
  );
}

function getOffset(url: string | null) {
  if (!url) {
    return null;
  }

  return Number(new URL(url).searchParams.get('offset'));
}
