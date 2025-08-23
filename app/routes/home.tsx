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

function validateCredentials(credentials : Credentials) {
  if (!credentials.username) {
    return { valid: false, message: "username input must be provided"}
  }

  if (!credentials.password) {
    return { valid: false, message: "password input must be provided"}
  }

  if (credentials.username !== "admin") {
    return { valid: false, message: "invalid username"}
  }

  if (credentials.password !== "admin") {
    return { valid: false, message: "invalid password"}
  }

  return { valid: true, message: "Logged in successfully" }
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
                  <Input type="text" name="username" id="username" autoComplete="username" />
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="password">Password:<span aria-label="required">*</span></Label>
                  <Input type="password" name="password" id="password" />
                </div>
                <div className="flex flex-col">
                  <Button type="submit">Log in</Button>
                </div>
            </fieldset>
          </Form>
        </div>
        <div>
          {actionData ? <p>{actionData.message}</p> : null}
        </div>
      </div>
    </main>
  )
}
