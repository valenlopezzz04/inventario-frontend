import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en el localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
