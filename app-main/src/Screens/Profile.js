import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Store } from '../Store';

const Profile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords doesn't match!");
    } else
      try {
        const { data } = await axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        alert('User updated successfully');
      } catch (err) {
        alert(err);
      }
  };

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <h1>User Profile</h1>
      <div className="fs-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="fs-container">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
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
        />
      </div>

      <div className="fs-container">
        <label htmlFor="cfpassword">Confirm password</label>
        <input
          id="cfpassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit">Update</button>
    </form>
  );
};

export default Profile;
