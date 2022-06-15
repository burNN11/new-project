import React, { useState, useEffect, useReducer, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbar.scss';
import axios from 'axios';
import { Store } from '../Store.js';

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

const Searchbar = () => {
  const [{ products, product }, dispatch] = useReducer(reducer, {
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

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Cauta..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((item) => {
            return (
              <div className="search-product" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name} </h3>
                <h1>{item.price} RON</h1>
                <button onClick={() => addToCartHandler(item)}>Add</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
