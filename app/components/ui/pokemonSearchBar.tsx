import { Form, useSearchParams, type HTMLFormMethod } from 'react-router';
import { Input } from './input';
import { Button } from './button';

type PokemonSearchBarParams = {
  method?: HTMLFormMethod;
  action: string;
};

export default function PokemonSearchBar({
  method = 'GET',
  action,
}: PokemonSearchBarParams) {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  return (
    <Form
      method={method}
      action={action}
      className="flex w-full justify-center max-w-xl px-8 gap-2"
    >
      <Input
        key={q}
        aria-label="Search pokemon by name or id"
        id="q"
        name="q"
        type="search"
        placeholder="Pikachu"
        className="w-full"
        defaultValue={q}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}
