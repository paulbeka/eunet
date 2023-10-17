import React, { useContext, useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';

const LoginProtectedRoute = ({ element, ...rest }) => {
  const { user, checkAuthenticated, login, logout } = useContext(AuthContext);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    checkAuthenticated()
      .then(result => {
        setAuth(result); 
      })
      .catch(error => {
        console.error('Error during authentication check:', error);
        setAuth(false);
      });
  }, [checkAuthenticated]);

  if (auth === null) {
    return <></>;
  } else if (auth === true) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};


export default LoginProtectedRoute;
