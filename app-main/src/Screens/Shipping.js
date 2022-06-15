import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import '../Styles/contactus.scss';

const Shipping = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fname, setfName] = useState(shippingAddress.fname || '');
  const [county, setCounty] = useState(shippingAddress.county || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [postal, setPostal] = useState(shippingAddress.postal || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fname,
        county,
        city,
        address,
        postal,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fname,
        county,
        city,
        address,
        postal,
      })
    );
    navigate('/payment');
  };
  return (
    <form className="form-container" onSubmit={submitHandler}>
      <h1>Shipping details</h1>
      <div className="fs-container">
        <label htmlFor="name">Full Name</label>
        <input
          id="fullname"
          type="text"
          value={fname}
          required
          onChange={(e) => setfName(e.target.value)}
        />
      </div>
      <div className="fs-container">
        <label htmlFor="county">County</label>
        <input
          id="county"
          type="text"
          value={county}
          required
          onChange={(e) => setCounty(e.target.value)}
        />
      </div>
      <div className="fs-container">
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="fs-container">
        <label htmlFor="city">Address</label>
        <input
          id="city"
          type="text"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="fs-container">
        <label htmlFor="city">Postal Code</label>
        <input
          id="postal"
          type="number"
          value={postal}
          required
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
};

export default Shipping;
