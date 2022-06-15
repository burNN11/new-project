import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Axios from 'axios';
import '../Styles/placeorder.scss';

const Placeorder = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  cart.totalPrice = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );

  const placeOrderHandler = async () => {
    try {
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });

      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div className="placeorder_container">
      <h1>Preview the order</h1>
      <div className="placeorder_container_items">
        <h2>Name: {cart.shippingAddress.fname}</h2>
        <h2>
          Address:
          <br />
          {cart.shippingAddress.address},{cart.shippingAddress.city},{' '}
          {cart.shippingAddress.postal},{cart.shippingAddress.county}
        </h2>

        <h2>
          Payment method:
          <br />
          {cart.paymentMethod}
        </h2>

        {cart.cartItems.map((item) => (
          <div key={item._id} className="order_items">
            <img src={item.image} alt={item.name} />
            <h3>
              {item.name} {item.quantity} * {item.price} RON
            </h3>
          </div>
        ))}
      </div>

      <h2>Total price: {cart.totalPrice} RON</h2>

      <button
        className="order_button"
        onClick={placeOrderHandler}
        disabled={cart.cartItems.length === 0}
      >
        Place the order
      </button>
    </div>
  );
};

export default Placeorder;
