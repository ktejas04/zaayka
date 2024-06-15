import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Orders from './pages/Orders';
import List from './pages/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:8000';

  return (
    <div>
      <ToastContainer />
      <Navbar className="border-b border-red-600"/>

      {/* Contents */}
      <div className='flex'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App