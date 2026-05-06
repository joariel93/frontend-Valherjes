'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  userRole: null,
  setUserRole: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isInitialized: false
});

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = sessionStorage.getItem('authToken');
      const savedRole = sessionStorage.getItem('userRole');
      
      if (token && savedRole) {
        setIsAuthenticated(true);
        setUserRole(savedRole);
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const handleSetUserRole = (role) => {
    setUserRole(role);
    if (role) {
      sessionStorage.setItem('userRole', role);
    } else {
      sessionStorage.removeItem('userRole');
    }
  };

  // No renderizar nada hasta que la autenticación esté inicializada
  if (!isInitialized) {
    return null;
  }

  const value = {
    userRole,
    setUserRole: handleSetUserRole,
    isAuthenticated,
    setIsAuthenticated,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
