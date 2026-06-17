import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on page reload
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { accessToken: token, refreshToken, user: userData } = data.data;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setAccessToken(token);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async ({ fullName, email, password }) => {
    const { data } = await api.post('/auth/register', { fullName, email, password });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!user && !!accessToken;

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
