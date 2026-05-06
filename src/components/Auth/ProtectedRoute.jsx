'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const router = useRouter();
  const { userRole, isAuthenticated, isInitialized } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

      // Verificar tanto la autenticación como el rol
      if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
        router.push('/');
      } else {
        setAuthorized(true);
      }
    }
  }, [isInitialized, userRole, requiredRole, router, isAuthenticated]);

  // No mostrar nada mientras se verifica la autorización
  if (!isInitialized || !authorized) {
    return null;
  }

  // Si está autorizado, mostrar el contenido
  return children;
};

export default ProtectedRoute; 