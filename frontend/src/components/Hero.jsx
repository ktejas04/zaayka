import React, { forwardRef } from 'react';
import background from "../assets/hero_food.jpg";

const Hero = forwardRef(({menuRef},ref) => {

  const scrollToMenu = () => {
    if (menuRef && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return ( 
    <div
     style={{
      backgroundImage: `url(${background})`,
      maxWidth: "86%"      
     }}
     className='bg-cover bg-right mx-auto my-40 py-20 lg:py-20 xl:py-28 2xl:py-36 px-14 lg:px-20 2xl:px-24 text-white rounded-3xl min-h-[40vh] lg:min-h-[30vh] w-full md:max-w-[93.5vw]' ref={ref}>
        <h2 className='text-4xl lg:text-[33px] xl:text-[40px] 2xl:text-[57px] sm:w-[77%] lg:w-[55%] xl:w-[45%] 2xl:w-[49%] lg:leading-tight font-bold animate-fade-in-fast'>Order your favourite food here</h2>
        <p className='md:pt-6 xl:pt-8 2xl:pt-10 md:w-full lg:w-[60%] hidden md:block lg:text-base 2xl:text-[18px] font-semibold animate-fade-in-slow'>Welcome to Zaayka, where every meal is a celebration of taste. Our mission is to deliver culinary joy to your doorstep with a diverse menu of fresh, delicious dishes. Enjoy traditional Indian flavors, international cuisines, and comforting meals.</p>
        <button className='text-base md:mt-6 lg:mt-10 bg-white text-dark-coffee py-1.5 px-3 lg:py-3 lg:px-8 rounded-3xl font-semibold hover:bg-white/85 transition-all animate-fade-in duration-300'
        onClick={scrollToMenu}
        >View Menu</button>
    </div>    
  )
});

export default Hero