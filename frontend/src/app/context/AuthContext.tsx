// app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifica se o cookie existe e atualiza o estado de autenticação
  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token); // Atualiza o estado com base na presença do cookie
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    Cookies.set('authToken', 'your-token-value', { expires: 7, path: '/' }); // Define o cookie com o caminho correto
    router.push('/'); // Redireciona após o login
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('authToken'); // Remove o cookie
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
