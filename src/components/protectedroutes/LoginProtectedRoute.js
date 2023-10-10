import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';

const LoginProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default LoginProtectedRoute;