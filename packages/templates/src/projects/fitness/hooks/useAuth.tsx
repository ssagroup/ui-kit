import { createContext, useContext, useEffect } from 'react';

import API from '@fitness/apis/index';

import { useApi } from '@ssa-ui-kit/hooks';
import { User } from '@ssa-ui-kit/widgets';

/**
 * Inspired by https://usehooks.com/useAuth/
 *
 * Authentication to be implemented in the subsequent releases.
 * */
const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, query: loadUser } = useApi(API.user.get, {} as User);

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
