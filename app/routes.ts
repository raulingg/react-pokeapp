import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('components/authWrapper.tsx', [
    route('/', 'routes/home/home.tsx', [
      index('routes/home/pokemonList.tsx')
    ]),
  ]),
  route('/login', 'routes/login.tsx')
] satisfies RouteConfig;
