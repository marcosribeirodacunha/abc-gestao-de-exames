import React, { createContext, useCallback, useState } from 'react';

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

    if (storageUser && storageToken) {
      api.defaults.headers.authorization = `Bearer ${storageToken}`;
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

      localStorage.setItem('@abc:user', JSON.stringify(storageUser));
      localStorage.setItem('@abc:token', data.token);
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
