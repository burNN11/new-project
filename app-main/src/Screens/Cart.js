import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import '../Styles/cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  console.log(cartItems);

  const updateCartHandler = (item, quantity) => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    if (quantity < 1) {
      ctxDispatch({
        type: 'CART_REMOVE_ITEM',
        payload: { ...item },
      });
    }
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div className="cart_items">
      <h1>Cart Items</h1>
      {cartItems.length === 0 && (
        <h2 className="items_empty"> There are no products!</h2>
      )}

      {cartItems.map((item) => (
        <div key={item._id} className="items_list">
          <img src={item.image} alt={item.name} />

          <h3>{item.name}</h3>
          <div className="plus-minus">
            <button onClick={() => updateCartHandler(item, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => updateCartHandler(item, item.quantity - 1)}>
              -
            </button>
          </div>
          <h3 className="items_price">
            {item.quantity} * {item.price} RON
          </h3>
        </div>
      ))}

      <div className="cart_footer">
        <h2>
          Total: ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : ${' '}
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h2>
        <button
          className="continue_button"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cart;
