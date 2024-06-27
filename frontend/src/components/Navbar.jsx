import React, { useContext, useEffect, useState } from 'react'
import zaayka from "../assets/zaayka.svg"
import { assets } from "../assets/frontend_assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import { navbar } from '../assets/frontend_assets/assets';

const Navbar = ({setShowLoginSignup, sectionRefs, footerRef}) => {

  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

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

    <>
      {/* Desktop Navigation */}
      <div className='bg-gray-50 py-3 px-6 sm:px-12 md:px-16 lg:px-14 xl:px-32 hidden sm:flex justify-between items-center fixed top-0 left-0 w-full z-10'>
        <Link to="/"><img src={zaayka} alt="zaayka" 
        width={60}
        /></Link>
        <div>
        <ul className='flex sm:gap-2 md:gap-5 lg:gap-7 xl:gap-10 sm:text-md md:text-base lg:text-[1.15rem] *:list-item font-semibold'>
          <li onClick={() => {
          navigate('/');
          scrollToSection(sectionRefs.hero, 64);
          }}>Home</li>
            <li onClick={() => scrollToSection(sectionRefs.menu)}>Menu</li>
            <li onClick={() => scrollToSection(sectionRefs.downloadApp)}>Mobile-App</li>
            <li onClick={() => scrollToSection(footerRef)}>Contact Us</li>
        </ul>
        </div>
        <div className='flex items-center justify-between sm:gap-3 md:gap-5 lg:gap-7 xl:gap-12 *:cursor-pointer *:transition-all *:duration-300 ease-in'>
          {
            showSearchIcon ? 
            <img src={assets.search_icon} alt="search" onClick={() => setShowSearchIcon(false)} width={24} className='sm:w-5 md:w-6 xl:w-7'/> : 
            <form>
              <input type="text" onBlur={() => setShowSearchIcon(true)}
              className='px-2 py-1 outline-1'
              />
            </form>
          }
          
          {/* Orange dot */}
          <div className='relative'>
            <Link to="/cart"><img src={assets.cart_icon} alt="cart" width={28} className='opacity-70 sm:w-6 md:w-7 xl:w-8'/></Link>
            {/* {console.log(cartItems)} */}
            {
              Object.keys(cartItems).length > 0 &&
              <div className='absolute min-h-2.5 min-w-2.5 bg-carrot top-[-6px] right-[-6px] rounded-xl'></div>
            }
            </div>

          {
            !token ? (
            <button className='bg-carrot/85 hover:bg-carrot text-white px-3 md:px-5 py-1 rounded-3xl text-sm lg:text-base outline-none font-semibold'
              onClick={() => setShowLoginSignup(true)}
            >
            Sign In
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

      {/* Mobile Navigation */}
      {/* Hamburger Menu */}
      <div className='bg-gray-50 py-3 px-10 flex sm:hidden justify-between items-center fixed top-0 left-0 w-full z-10'>
        <Link to="/"><img src={zaayka} alt="zaayka" 
        width={60} height={60}
        /></Link>
        <div className="h-full cursor-pointer">
          <img src={showHamburgerMenu ? assets.menu_open : assets.menu_close} alt="mobile-menu" onClick={()=>setShowHamburgerMenu(prev=>!prev)}
          width={48}
          className='p-2.5 hover:bg-neutral-200 rounded-lg duration-300'
          />
            <div className={`flex flex-col justify-between gap-2 font-semibold fixed top-20 ${showHamburgerMenu ? "right-0" : "-right-48"} z-20 bg-neutral-700/5 text-[18px] px-4 py-5 w-48 h-fit duration-300 rounded-l-xl backdrop-filter backdrop-blur-sm`}>
              {/* Search */}
              <div className='ham-item'>
                <img src={assets.search_icon} alt="search" onClick={() => setShowSearchIcon(false)} width={18} height={18}/>Search
              </div>
              {/* Cart */}
              <div className='relative'>
                <Link to="/cart" className='ham-item'><img src={assets.cart_icon} alt="cart" width={20} />Cart</Link>
                {/* Orange dot */}
                {
                  Object.keys(cartItems).length > 0 &&
                  <div className='absolute h-1.5 w-1.5 bg-carrot top-[6px] left-[32px] rounded-xl'></div>
                }
              </div>   
              {/* User Account */}
              <button className='ham-item' onClick={() => {
                setShowLoginSignup(true);
                setShowHamburgerMenu(false);
                }}>
                {
                  !token ? (
                    <><img src={navbar.user} alt="user" width={16} onClick={()=> setShowLoginSignup(true)}/>Sign In</>
                  ) : (
                    <div className='text-left font-semibold text-[14px]'>
                      <p className='text-[18px] mb-2'>Hello, {firstName}</p>
                      <Link to="/my-orders" onClick={() => setShowAccountOptions(false)}>
                        <div className='ham-item mb-2'>
                          <img src={navbar.bag_icon_black} alt="bag" width={18}/>
                          <p>Orders</p>
                        </div>
                      </Link>
                      <div className='ham-item'
                      onClick={Logout}>
                        <img src={navbar.logout_icon_black} alt="logout" width={18} />
                        <p>Log Out</p>
                      </div>

                    </div>
                  )
                }
              </button>
            </div>
        </div>      
      </div>

      {/* Side Navbar */}
      <div className={`sm:hidden fixed top-1/4 ${showMobileNav ? "left-0" : "-left-16 hover:opacity-70"} z-10 bg-neutral-700/5 h-fit px-1 rounded-r-xl cursor-pointer duration-300 flex items-center backdrop-filter backdrop-blur-sm`}>
        <ul className='*:mobile-nav-item'>
          <li onClick={() => {
          navigate('/');
          scrollToSection(sectionRefs.hero, 64);}}><img src={navbar.about} alt="about" width={32}/></li>
          <li onClick={() => scrollToSection(sectionRefs.menu)}><img src={navbar.menu} alt="menu" width={32}/></li>
          <li onClick={() => scrollToSection(sectionRefs.downloadApp)}><img src={navbar.app} alt="app" width={32}/></li>
          <li onClick={() => scrollToSection(footerRef)}><img src={navbar.contact} alt="contact" width={32}/></li>
        </ul>
        <img src={showMobileNav ? assets.arrow_left : assets.arrow_right} alt="close" width={32}
        className='hover:opacity-70 duration-300' 
        onClick={() => setShowMobileNav(prev => !prev)}/>
      </div>
    </>
  )
}

export default Navbar