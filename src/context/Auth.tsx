import React, { createContext, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { differenceInHours } from 'date-fns';

import api from '../services/api';

interface User {
  name: string;
}

interface Response {
  user: User;
  token: string;
}

interface Credentials {
  login: string;
  password: string;
}

interface ContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<ContextData>({} as ContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const storageUser = localStorage.getItem('@abc:user');
    const storageToken = localStorage.getItem('@abc:token');

    // 1606583523808
    if (storageUser && storageToken) {
      const parsedToken = JSON.parse(storageToken);
      const tokenExp = new Date(parsedToken.exp);

      if (differenceInHours(new Date(), tokenExp) >= 24) {
        toast.error('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('@abc:user');
        localStorage.removeItem('@abc:token');
        setLoading(false);
        return null;
      }

      api.defaults.headers.authorization = `Bearer ${parsedToken.token}`;
      setLoading(false);
      return JSON.parse(storageUser);
    }

    setLoading(false);
    return null;
  });

  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      const { data } = await api.post<Response>('/sessions', credentials);

      const storageUser = { name: data.user.name };
      const storageToken = {
        token: data.token,
        exp: Date.now(),
      };

      localStorage.setItem('@abc:user', JSON.stringify(storageUser));
      localStorage.setItem('@abc:token', JSON.stringify(storageToken));
      api.defaults.headers.authorization = `Bearer ${data.token}`;

      setUser(storageUser);
      setLoading(false);
    } catch (error) {
      if (error.response) throw error.response;
      else throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    api.defaults.headers.authorization = undefined;
    localStorage.removeItem('@abc:user');
    localStorage.removeItem('@abc:token');
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
