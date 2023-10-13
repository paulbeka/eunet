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

  useEffect(() => {

    if(user === null) {
      fetchClient().get("checkLogin")
      .then((res) => {
        if(res.status === 200) {
          login({loggedIn: true})
        } else {
          logout()
        }
      })
      .catch((err) => {
        console.log(err);
        logout()
      })
    }

  }, [])

  const contextValue = {
    user,
    isAuthenticated: !!user,
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