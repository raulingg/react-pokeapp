import { type ReactNode } from "react";
import { Outlet, redirect } from "react-router";
import AuthProvider from "~/contexts/auth/authProvider";
import { isAuthenticated } from "~/services/auth";

export async function clientLoader() {
  if (!isAuthenticated()) {
    throw redirect('/login')
  }
}

export default function AuthWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
