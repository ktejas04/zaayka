// import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Home from './pages/Home';
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";
import { useEffect, useRef, useState } from "react";
import Verification from "./pages/Verification";
import MyOrders from "./pages/MyOrders";

const App = () => {

  const [showLoginSignup, setShowLoginSignup] = useState(false);
  const [sectionRefs, setSectionRefs] = useState({});
  const footerRef = useRef(null);

  //Stops vertical scrolling when form is showed
  useEffect(() => {
    if (showLoginSignup) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[showLoginSignup]);

  return (
    <>
    {
      showLoginSignup && <LoginSignup setShowLoginSignup={setShowLoginSignup}/>
        
     }
      <Navbar setShowLoginSignup={setShowLoginSignup} sectionRefs={sectionRefs} footerRef={footerRef}/>
      <Routes>
        <Route path="/" element={<Home setSectionRefs={setSectionRefs}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <Footer ref={footerRef}/>    
    </>
  )
}

export default App