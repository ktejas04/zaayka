import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Add from './pages/Add';
import Orders from './pages/Orders';
import List from './pages/List';
import Error from './components/Error';

const App = () => {
  const url = 'http://localhost:8000';
  const [allowLogin, setAllowLogin] = useState(() => {
    // Retrieve the initial state from local storage
    return localStorage.getItem('allowLogin') === 'true';
  });
  // const [allowLogin, setAllowLogin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setAllowLogin(false);
    localStorage.removeItem('allowLogin');
    navigate('/login');
  };

  useEffect(()=>{
    // console.log(allowLogin);
    localStorage.setItem('allowLogin', allowLogin);

    // if (allowLogin) {
    //   navigate('/');
    // }

    return ()=>{};
  },[allowLogin]);

  return (
    <>
      <ToastContainer autoClose={1500}/>
        {
          !allowLogin? (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login url={url} setAllowLogin={setAllowLogin} allowLogin={allowLogin} />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : (
            <>
              <Navbar className="border-b border-red-600"/>

              {/* Contents */}
              <div className='flex'>
                <SideBar onLogout={handleLogout}/>
                <Routes>
                  <Route path="/" element={<></>} />
                  <Route path="/add" element={<Add url={url} />} />
                  <Route path="/list" element={<List url={url} />} />
                  <Route path="/orders" element={<Orders url={url} />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </div>
            </>
          )
        }        
    </>
  );
};

export default App;
