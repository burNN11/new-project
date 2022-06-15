import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Store } from '../Store';

const Signin = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
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
      <h1>Login</h1>
      <div className="fs-container">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="fs-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign in</button>

      <NavLink to={`/signup?redirect=${redirect}`}>Create Account</NavLink>
    </form>
  );
};

export default Signin;
