import { useEffect, useState } from 'react';
import type { AuthUser } from './authContext';
import AuthContext from './authContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const serializedSession = localStorage.getItem('session');
    const session = serializedSession
      ? (JSON.parse(serializedSession) as { user: AuthUser })
      : null;

    if (session) {
      setUser(session.user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
