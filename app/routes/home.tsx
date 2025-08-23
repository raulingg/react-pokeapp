import { Form } from "react-router";
import type { Route } from "./+types/home";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import PokeballIcon from '~/assets/pokeball.svg'

type Credentials = {
  username: String, 
  password: String
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const credentials: Credentials = {
    username: formData.get("username") as String,
    password:formData.get("password") as String
  }

  return validateCredentials(credentials)
}

type ValidationError = {
  username?: String, 
  password?: String, 
  invalidCredentials?: String
} 

type ValidationResult = {
  valid: boolean,
  errors: ValidationError
}

function validateCredentials(credentials : Credentials) : ValidationResult {
  const errors: ValidationError = {}

  if (!credentials.username) {
    errors.username = 'username is an empty string'
  }

  if (!credentials.password) {
    errors.password = 'password is an empty string'
  }

  if (errors.username || errors.password) {
    return { valid: false, errors }
  }

  if (credentials.username !== "admin" || credentials.password !== "admin") {
    return { valid: false, errors: { invalidCredentials: 'invalid credentials' } }
  }

  return { valid: true, errors: {} }
  
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokeapp" },
    { name: "description", content: "Login to Pokeapp!" },
  ];
}

export default function Home({ actionData } : Route.ComponentProps) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex items-center gap-4">
          <h1 className="text-5xl">Pokeapp</h1>
          <img
              src={PokeballIcon}
              alt="React Router"
              className="w-16"
            />
        </header>
        <div className="max-w-[360px] w-full rounded-3xl border border-gray-200 p-8">
          <Form method="post">
              <fieldset className="flex gap-4 flex-col justify-center items-center">
                <div className="flex mb-8">
                  <legend className="text-3xl">Log in</legend>
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="username">Username:<span aria-label="required">*</span></Label>
                  {actionData && !!actionData.errors.username ? <p className="text-red-400">{actionData.errors.username}</p> : null}
                  <Input type="text" name="username" id="username" autoComplete="username" />
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="password">Password:<span aria-label="required">*</span></Label>
                  {actionData && !!actionData.errors.password ? <p className="text-red-400">{actionData.errors.password}</p> : null}
                  <Input type="password" name="password" id="password" />
                </div>
                {actionData && !!actionData.errors.invalidCredentials ? <p className="text-red-400">{actionData.errors.invalidCredentials}</p> : null} <p></p>
                <div className="flex flex-col">
                  <Button type="submit">Log in</Button>
                </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </main>
  )
}
