import React, { useState } from "react";
import './CSS/Register.css';
import fetchClient from "../util/axiosInstance";
import { useAuth } from '../util/AuthContext';


const Register = () => {

  const [errorRegistering, setErrorRegistering] = useState(false);
  const authFunctions = useAuth()

  const submitRegister = async(e) => {
    e.preventDefault();

    if(e.target.password.value !== e.target.checkPassword.value) {
      setErrorRegistering(true);
      return;
    }

    const body = {
      "username": e.target.username.value,
      "email": e.target.email.value,
      "password": e.target.password.value
    }

    fetchClient().post("/register", body)
    .then((res) => {
      if(res.status === 200 || res.status === 204) {
        setErrorRegistering(false)
        const loginBody = {
          "email": body.email,
          "password": body.password
        }
        fetchClient().post("/login", body)
        .then((loginRes) => {
          if(loginRes.status === 200) {
            localStorage.clear()
            localStorage.setItem("accessToken", res.data.accessToken)
            authFunctions.login({loggedIn: true})
            window.location.href = '/'
          } else {
            window.location.href = '/'
          }
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        setErrorRegistering(true)
      }
    })
    .catch((err) => {
      console.log(err);
      setErrorRegistering(true)
    })
  }

  return (
    <div className="registerpage">
      <div className="register-title"><h1>Register</h1></div>
      <hr style={{"border-bottom": "1px solid black", "width" : "60%"}}/>
      <form onSubmit={submitRegister} className="register-form">
      <div className="form-group">
        <label className="form-label" htmlFor="email">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password:</label>
        <input type="password" className="password" name="password" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Confirm Password:</label>
        <input type="password" className="password" name="checkPassword" required />
      </div>
      {errorRegistering ? <p style={{"color": "red"}}>There was an error registering you. Check passwords are the same.</p>: <></>}
      <button className='register-button' type="submit">Register</button>
    </form>
    </div>
  )
}

export default Register