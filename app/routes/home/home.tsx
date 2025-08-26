import { Outlet, useNavigation } from 'react-router';
import PokeballIcon from '~/assets/pokeball.svg';
import Loading from '~/components/ui/Loading';
import PokemonSearchBar from '~/components/ui/pokemonSearchBar';

export default function Home() {
  const { state } = useNavigation();
  const shouldShowLoading = state === 'loading' || state === 'submitting';

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16">
        <header className="flex items-center gap-4">
          <h1 className="text-5xl">Pokeapp</h1>
          <img src={PokeballIcon} alt="Pokeapp icon" className="w-16" />
        </header>
        <PokemonSearchBar action="/pokemon" />
        <div className="grid content-center items-center min-h-80">
          {shouldShowLoading ? <Loading /> : <Outlet />}
        </div>
      </div>
    </main>
  );
}
