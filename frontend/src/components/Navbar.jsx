import React, { useContext, useEffect, useState } from 'react'
import zaayka from "../assets/zaayka.svg"
import { assets } from "../assets/frontend_assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

const Navbar = ({setShowLoginSignup, sectionRefs, footerRef}) => {

  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const {cartItems, token, setToken, name} = useContext(Context);

  const navigate = useNavigate();
  const firstName = name.split(" ")[0];

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");  
    // window.location.reload();
  }

  useEffect(() =>{
    if (token){
      window.location.reload();
      return ()=> {};
    }
  },[]);

  const scrollToSection = (ref, offset = 0) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 96 - offset,
        behavior:'smooth'
      })
      // ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
 return (
    <div className='bg-gray-50 py-3 px-32 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
      <Link to="/"><img src={zaayka} alt="zaayka" 
      width={60}
      /></Link>
      <div>
      <ul className='flex gap-10 text-[1.15rem] *:list-item font-semibold'>
      <li onClick={() => {
        navigate('/');
        scrollToSection(sectionRefs.hero, 64);
        }}>Home</li>
          <li onClick={() => scrollToSection(sectionRefs.menu)}>Menu</li>
          <li onClick={() => scrollToSection(sectionRefs.downloadApp)}>Mobile-App</li>
          <li onClick={() => scrollToSection(footerRef)}>Contact Us</li>
      </ul>
      </div>
      <div className='flex items-center justify-between gap-12 *:cursor-pointer *:transition-all *:duration-300 ease-in'>
        {
          showSearchIcon ? 
          <img src={assets.search_icon} alt="search" onClick={() => setShowSearchIcon(false)}/> : 
          <form action="">
            <input type="text" onBlur={() => setShowSearchIcon(true)}
            className='px-2 py-1 outline-1'
            />
          </form>
        }
        
        {/* Orange dot */}
        <div className='relative'>
          <Link to="/cart"><img src={assets.cart_icon} alt="cart" width={35} className='opacity-70'/></Link>
          {
            Object.keys(cartItems).length > 0 &&
            <div className='absolute min-h-2.5 min-w-2.5 bg-carrot top-[-6px] right-[-6px] rounded-xl'></div>
          }
          </div>

        {
          !token ? (
          <button className='bg-ochre/60 hover:bg-ochre px-5 py-1 rounded-3xl text-[1rem] outline-none font-semibold'
            onClick={() => setShowLoginSignup(true)}
          >
          Sign Up
          </button> ) : (
          <div className='cursor-pointer'>
          <img src={assets.profile_icon} alt="profile" className='relative'
          onClick={() => setShowAccountOptions(prev => !prev)}/>
          <ul className={`absolute z-10 right-16 top-20 ${showAccountOptions ? "flex flex-col px-4 py-2 border border-carrot items-center bg-carrot rounded-md" : "hidden"}`}>
            <p className='text-white font-semibold text-xl mb-2'>Hello, {firstName}</p>
            <Link to="/my-orders" onClick={() => setShowAccountOptions(false)}><li className='border-b-2 py-3 flex items-center gap-2 font-semibold text-xl text-white w-32 hover:opacity-80'>
              <div className='bg-white/70 rounded-full flex items-center justify-center w-10 h-10'><img src={assets.bag_icon} alt="bag" /></div>
              <p>Orders</p>
            </li></Link>
            <li onClick={Logout}
             className='py-3 flex items-center gap-2 font-semibold text-xl text-white w-32 hover:opacity-80'>
            <div className='bg-white/70 rounded-full flex items-center justify-center w-10 h-10'><img src={assets.logout_icon} alt="logout" /></div>
              <p>Log Out</p>
            </li>
          </ul>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Navbar