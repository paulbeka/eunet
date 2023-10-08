import React from 'react'
import axiosInstance from '../util/axiosInstance';
import './CSS/Login.css'


const Login = () => {

  const submitLogin = (e) => {
    e.preventDefault();
    const data = {
      "email": e.target.email.value,
      "password": e.target.password.value
    }

    axiosInstance.post("")
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
      <button className='login-button' type="submit">Login</button>
    </form>
    </div>
  )

}

export default Login