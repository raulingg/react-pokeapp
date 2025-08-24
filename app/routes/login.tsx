import { data, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/login";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import PokeballIcon from '~/assets/pokeball.svg'
import { isAuthenticated, login, type AuthCredentials } from "~/services/auth";

type ValidationError = {
  username?: string, 
  password?: string, 
  invalidCredentials?: string
} 

type ValidationResult = {
  valid: boolean,
  errors: ValidationError
}

export async function clientLoader() {
  if (isAuthenticated()) {
    throw redirect('/')
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const credentials = {
    username: String(formData.get('username')),
    password: String(formData.get('password'))
  }

  const validationResult = validateFormInputs(credentials)

  if (!validationResult.valid) {
    return data({ errors: validationResult.errors }, { status: 400 }) 
  }

  try {
    login(credentials)
    
  } catch (error) {
    let errorMessage = 'Oops! something went wrong. Try again.'
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return data({ errors: { invalidCredentials: errorMessage }}, { status: 400})
  }
}


function validateFormInputs(credentials: AuthCredentials) : ValidationResult {
  const errors: ValidationError = {}

  if (!credentials.username) {
    errors.username = 'username is an empty string'
  }

  if (!credentials.password) {
    errors.password = 'password is an empty string'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokeapp" },
    { name: "description", content: "Login to Pokeapp!" },
  ];
}

export default function Login() {
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex items-center gap-4">
          <h1 className="text-5xl">Pokeapp</h1>
          <img src={PokeballIcon} alt="Pokeapp icon" className="w-16" />
        </header>
        <div className="max-w-[360px] w-full rounded-3xl border border-gray-200 p-8">
          <fetcher.Form method="post">
              <fieldset className="flex gap-4 flex-col justify-center items-center">
                <div className="flex mb-8">
                  <legend className="text-3xl">Log in</legend>
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="username">Username:<span aria-label="required">*</span></Label>
                  {errors && !!errors.username ? <p className="text-red-400">{errors.username}</p> : null}
                  <Input type="text" name="username" id="username" autoComplete="username" />
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="password">Password:<span aria-label="required">*</span></Label>
                  {errors && !!errors.password ? <p className="text-red-400">{errors.password}</p> : null}
                  <Input type="password" name="password" id="password" />
                </div>
                {errors && !!errors.invalidCredentials ? <p className="text-red-400">{errors.invalidCredentials}</p> : null} <p></p>
                <div className="flex flex-col">
                  <Button type="submit">Log in</Button>
                </div>
            </fieldset>
          </fetcher.Form>
        </div>
      </div>
    </main>
  )
}
