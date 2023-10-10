import React, { createContext, useState, useEffect } from 'react'
import fetchClient from '../util/axiosInstance'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    console.log("LOGGED IN!")
    setUser(userData)
  }

  const logout = () => {
    localStorage.clear();
    setUser(null)
  }

  useEffect(() => {

    // IS THIS NEEDED? OR DO I JUST NEED TO DO A CHECK ON THE BACKEND OR SOMETHING SIMILAR
    // MAYBE ONLY CHECK FOR TOKEN ON BACKEND, AND ONLY CHECK ON NAVBAR FOR SOME OF THESE OPTIONS
    // THEREFORE NO NEED FOR AN AUTHCONTEXT? MAYBE
    fetchClient().get("/checkLogin")
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

  } ,[])

  const contextValue = {
    user,
    isAuthenticated: !!user, // A boolean indicating whether the user is authenticated
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}