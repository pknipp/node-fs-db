import React, { useState, useContext } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import AuthContext from '../../auth';

const Login = () => {
  const [email, setEmail] = useState("demo@aol.com");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);

  const login = async (email, password) => {
    const response = await fetch(`/api/session`, { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data = await response.json();
    if (response.ok) {
      setCurrentUser(data.user);
    } else {
      setMessage(data.error.errors[0].msg || data.message);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let message = !email ? "Email address is needed." : !password ? "Password is needed." : "";
    if (message) return setMessage(message);
    setMessage('');
    login(email, password);
  }

  return (currentUser) ? <Redirect to="/" /> : (
    <main className="centered middled">
      <form className="auth" onSubmit={handleSubmit}>
      <h1>Welcome to my react/node-fs!</h1>
      <h4>I hope that you will either login or signup.</h4>
        <span>Email address:</span>
        <input
          type="text" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <span>Password:</span>
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button color="primary" variant="outlined" type="submit">Login</button>
        <span style={{color:"red", paddingLeft:"10px"}}>{message}</span>
        <span><NavLink className="nav" to="/signup" activeClassName="active">Signup</NavLink></span>
      </form>
    </main>
  );
}

export default Login;
