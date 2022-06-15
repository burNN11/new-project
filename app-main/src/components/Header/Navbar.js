import React, { useContext, useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './navbar.scss';
import Searchbar from '../Searchbar';
import { NavLink } from 'react-router-dom';
import { Store } from '../../Store';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [open, setOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <div className="Navbar">
      <div className="leftSide">
        <div className="links" id={showLinks ? 'hidden' : ' '}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contactus">Contact us</NavLink>
          <NavLink to="/cart">
            <ShoppingCartIcon />
            <span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          </NavLink>
          {userInfo ? (
            <div className="navigation_drop">
              <div onClick={() => setOpen(!open)}>
                <div className="userInfo">
                  {userInfo.name}
                  <ArrowDropDownIcon />
                </div>
                <div className="submenu">
                  {open && <NavLink to="/profile">User Profile</NavLink>}
                  {open && <NavLink to="/orderhistory">Order History</NavLink>}

                  {open && userInfo.isAdmin && (
                    <NavLink to="/admin/users">Users</NavLink>
                  )}
                  {open && userInfo.isAdmin && (
                    <NavLink to="/admin/orders">Orders</NavLink>
                  )}

                  {open && (
                    <NavLink to="/" onClick={signoutHandler}>
                      Sign Out
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <NavLink to="signin">Sign In</NavLink>
          )}
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <DensityMediumIcon />
        </button>
      </div>
      <div className="rightSide">
        <Searchbar />
      </div>
    </div>
  );
};

export default Navbar;
