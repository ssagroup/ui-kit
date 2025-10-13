import { createContext, useContext, useEffect } from 'react';

import { useApi } from '@ssa-ui-kit/hooks';
import { User } from '@ssa-ui-kit/widgets';

import API from '@apis/index';

/**
 * Inspired by https://usehooks.com/useAuth/
 *
 * Authentication to be implemented in the subsequent releases.
 * */
const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, query: loadUser } = useApi<User | null>(API.user.get, {});

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
