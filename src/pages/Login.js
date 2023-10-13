import React, { useState } from 'react'
import fetchClient from '../util/axiosInstance';
import './CSS/Login.css'
import { useAuth } from '../util/AuthContext';


const Login = () => {

  const [errorLoggingIn, setErrorLoggingIn] = useState(false)
  const authFunctions = useAuth()

  const submitLogin = (e) => {
    e.preventDefault();
    const body = {
      "email": e.target.email.value,
      "password": e.target.password.value
    }

    fetchClient().post("/login", body)
    .then((res) => {
      if(res.status === 200) {
        setErrorLoggingIn(false)
        localStorage.clear()
        localStorage.setItem("accessToken", res.data.accessToken)
        authFunctions.login({loggedIn: true})
        window.location.href = '/'
      } else {
        setErrorLoggingIn(true)
      }
    })
    .catch((err) => {
      console.log(err)
      setErrorLoggingIn(true)
    })
  }

  return (
    <div className="loginpage">
      <div className="login-title"><h1>Login</h1></div>
      <hr style={{"border-bottom": "1px solid black", "width" : "60%"}}/>
      <form onSubmit={submitLogin} className="login-form">
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      {errorLoggingIn ? <p style={{"color": "red"}}>Error logging in. Check username and password.</p> : <></>}
      <button className='login-button' type="submit">Login</button>
    </form>
    </div>
  )

}

export default Login