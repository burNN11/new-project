import Axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const Signup = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cfPassword) {
      alert('Parolele nu se potrivesc');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      //console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      alert('Parola sau adresa de email este gresita!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <form className="form-container" onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <div className="fs-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="fs-container">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="fs-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="fs-container">
        <label htmlFor="cfpassword">Confirm password</label>
        <input
          id="cfpassword"
          type="password"
          onChange={(e) => setCfPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <NavLink to={`/signin?redirect=${redirect}`}>
        Already have an account? -- Sign-In
      </NavLink>
    </form>
  );
};

export default Signup;
