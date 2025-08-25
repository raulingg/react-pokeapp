import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type {
  PokemonApiResponse,
  PaginatedPokemonApiResponseResult,
} from '~/types/pokemon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(timeInMilliseconds = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMilliseconds);
  });
}

export function getPokemonImageSrc(
  pokemon: PokemonApiResponse | PaginatedPokemonApiResponseResult
) {
  let id;

  if ('url' in pokemon) {
    const [, unsanitizedId] = pokemon.url.split('pokemon/');
    id = unsanitizedId.replace('/', '').toString();
  } else {
    id = pokemon.id;
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}
