import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({className}) => {
  return (
    <div className={`${className || ""} relative flex items-center border-b-2 border-coffee justify-between py-2 px-[4%]`}>
        <Link to="/"><img src={assets.logo} alt="logo" />Admin Panel</Link> {/*max(10%, 80px)*/}
        <h1 className='text-4xl text-coffee font-semibold'>Zaayka Admin Panel</h1>
        <img src={assets.profile_image} alt="profile" 
        className='w-16'
        />
    </div>
  )
}

export default Navbar