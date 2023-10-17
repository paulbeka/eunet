import React, { createContext, useContext, useState, useEffect } from 'react'
import fetchClient from '../util/axiosInstance'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    localStorage.clear();
    setUser(null)
  }

  const checkAuthenticated = async () => {
    return fetchClient().get("checkLogin")
      .then((res) => {
        if(res.status === 200 || res.status == 204) {
          return true
        }
        return false
      })
      .catch((err) => {
        console.log(err);
        logout()
        return false;
      })
  }

  const contextValue = {
    user,
    checkAuthenticated: checkAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};