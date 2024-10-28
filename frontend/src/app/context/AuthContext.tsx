"use client"; // Certifique-se de que este arquivo esteja marcado como um componente de cliente
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token); // Atualiza o estado com base na presença do cookie

    // Adiciona a verificação da rota
    const currentPath = window.location.pathname; // Obtém o caminho atual
    const isProtectedRoute = currentPath !== '/' && currentPath !== '/login';

    if (!token && isProtectedRoute) {
      router.push('/login'); // Redireciona para o login se não houver token
    }
  }, [router]);

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 7, path: '/' }); // Salva o token no cookie
    setIsAuthenticated(true); // Atualiza o estado para autenticado
    router.push('/homeLogged'); // Redireciona para a página após login
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('authToken'); // Remove o token do cookie
    router.push('/'); // Redireciona para a página inicial após logout
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
