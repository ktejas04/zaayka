import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sm:w-16 md:w-24 lg:w-[18%] min-h-[100vh] border-2 border-r-coffee'>

      {/* Sidebar Options */}
      <div className='border-r py-10 sm:px-1 lg:pl-[20%] flex flex-col gap-2 *:rounded-md'>
        <NavLink to="/add"
        className='py-2 px-2 flex gap-4 items-center border border-green-800 cursor-pointer'>
          <img src={assets.add_icon} alt="add-icon" />
          <p className='sm:hidden md:hidden lg:inline'>Add Items</p>
        </NavLink>
        <NavLink to="/list"
        className='py-2 px-1 flex gap-4 items-center border border-green-800 cursor-pointer'>
          <img src={assets.order_icon} alt="add-icon" />
          <p className='sm:hidden md:hidden lg:inline'>List Items</p>
        </NavLink>
        <NavLink to="/orders" 
        className='py-2 px-1 flex gap-4 items-center border border-green-800 cursor-pointer'>
          <img src={assets.order_icon} alt="add-icon" />
          <p className='sm:hidden md:hidden lg:inline'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar