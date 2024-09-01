import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Contact from './Pages/contactus/contact';
import About from './Pages/AboutUs/About';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import ProductAdd from './Pages/productadder/ProductAdd';
import Private from './Components/Private/Private';
import Awarness from './Pages/Awarness/Awarness';
import { UserContext } from './contexts/UserContext';
import Cart from './Pages/Cart/Cart';
import PartnerForm from './Pages/Forms/PartnerForm';
import Categories from './Pages/Categories/Categories';
import ProductView from './Pages/ProductView/ProductView';
import { useState } from "react";
import LoginFarmer from './Pages/Login/LoginFarmer';
import RegisterAsFarmer from './Pages/Register/RegisterAsFarmer';

function App() {
  const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact-us' element={<Private component={Contact}/>} />
          <Route path='/about-us' element={<About />} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/register-farmer' element={<RegisterAsFarmer/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/login-farmer' element={<LoginFarmer/>} />
          <Route path='/addpro' element={<ProductAdd/>}/>
          <Route path='/awareness' element={<Awarness/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/addpartner' element={<PartnerForm/>}/>
          <Route path='/categories' element={<Private component={Categories}/>}/>
          <Route path='/ProductView' element={<Private component={ProductView}/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
