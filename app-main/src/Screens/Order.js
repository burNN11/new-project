import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import '../Styles/order.scss';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload };
    default:
      return state;
  }
}

const Order = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        alert(err);
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="order_summary">
      <h1>Order{orderId}</h1>
      <div className="customer">
        <h2>Full Name: {order.shippingAddress.fname}</h2>
        <h2>
          Address:
          <br />
          {order.shippingAddress.address},{order.shippingAddress.city},{' '}
          {order.shippingAddress.postal},{order.shippingAddress.county}
        </h2>

        <h2>
          Payment method:
          <br />
          {order.paymentMethod}
        </h2>
      </div>
      <h2>Products:</h2>
      {order.orderItems.map((item) => (
        <li key={item._id} className="order_item">
          <h3>Item: {item.name}</h3>
          <h3>Quantity: {item.quantity}</h3>
          <h3>Price: {item.price} RON</h3>
        </li>
      ))}

      <h2>Full price: {order.totalPrice} RON</h2>

      <div>
        {order.isPaid ? <h2>Paid at {order.paidAt}</h2> : <h2>Not Paid</h2>}
      </div>
    </div>
  );
};

export default Order;
