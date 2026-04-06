
import React from 'react'
import './login.css'
const Login = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>

      <form className="login-form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;