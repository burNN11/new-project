import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import '../Styles/payment.scss';

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'paypal'
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <form className="payment_form" onSubmit={submitHandler}>
      <div className="box_card">
        <label htmlFor="paypal">Paypal </label>
        <h5>Paypal</h5>
        <input
          defaultChecked={paymentMethodName === 'paypal'}
          onChange={(e) => setPaymentMethod(e.target.value)}
          name="payment"
          type="radio"
          id="paypal"
          value="PAYPAL"
        />
      </div>
      <div className="box_card">
        <label htmlFor="visa">VISA card </label>
        <h5>VISA</h5>
        <input
          defaultChecked={paymentMethodName === 'visa'}
          onChange={(e) => setPaymentMethod(e.target.value)}
          name="payment"
          type="radio"
          id="visa"
          value="CARD VISA"
        />
      </div>

      <button>Continue</button>
    </form>
  );
};

export default Payment;
