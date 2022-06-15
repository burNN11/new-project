import React, { useEffect, useReducer, useContext } from 'react';
import '../Styles/products.scss';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Products = () => {
  const [{ products, product }, dispatch] = useReducer(logger(reducer), {
    products: [],
    product: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;
  const addToCartHandler = (item) => {
    const existItem = cart.cartItems.find((x) => x._id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="gallery">
      {products.map((item) => (
        <div className="content" key={item._id}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name} </h3>
          <h6>{item.price} RON</h6>
          <button className="buy" onClick={() => addToCartHandler(item)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
