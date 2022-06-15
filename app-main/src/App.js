import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Protected from './components/Protected';
import Products from './Screens/Products';
import Cart from './Screens/Cart';
import Contactus from './Screens/Contactus';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import Navbar from './components/Header/Navbar';
import Shipping from './Screens/Shipping';
import Payment from './Screens/Payment';
import Placeorder from './Screens/PlaceOrder';
import Order from './Screens/Order';
import Orderhistory from './Screens/Orderhistory';
import Profile from './Screens/Profile';
import Userlist from './Screens/Userlist';
import Orderlist from './Screens/Orderlist';
import Useredit from './Screens/Useredit';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route
          path="/order/:id"
          element={
            <Protected>
              <Order />
            </Protected>
          }
        />
        <Route
          path="/orderhistory"
          element={
            <Protected>
              <Orderhistory />
            </Protected>
          }
        />

        <Route
          path="/admin/users"
          element={
            <Protected>
              <Userlist />
            </Protected>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <Protected>
              <Useredit />
            </Protected>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Protected>
              <Orderlist />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
