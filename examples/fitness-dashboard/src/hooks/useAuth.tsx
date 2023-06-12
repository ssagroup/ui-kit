import { useEffect, createContext, useContext } from 'react';
import API, { User } from '@apis/index';

import { useApi } from '@ssa-ui-kit/hooks';

/**
 * Inspired by https://usehooks.com/useAuth/
 *
 * Authentication to be implemented in the subsequent releases.
 * */
const AuthContext = createContext<{ user?: User }>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, query: loadUser } = useApi<User>(API.user.get, {});

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
