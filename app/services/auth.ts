export type AuthCredentials = {
  username: String, 
  password: String
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('session')
}

export const login = ({ username, password }: AuthCredentials) => {
  if (username !== 'admin' || password !== 'admin') {
    throw new Error('invalid credentials')
  }

  localStorage.setItem('session', JSON.stringify({ user: { username }, loggedAt: Date.now() }))
}
