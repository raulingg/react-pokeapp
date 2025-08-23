import { createContext } from "react";

type AuthContextType = {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
}

export type AuthUser = {
  username: String
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
