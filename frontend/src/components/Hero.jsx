import React, { forwardRef } from 'react'  

const Hero = forwardRef(({menuRef},ref) => {

  const scrollToMenu = () => {
    if (menuRef && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='bg-[url("assets/hero_food.jpg")] sm:backdrop-blur-lg bg-cover bg-right mx-32 my-40 sm:py-8 lg:py-20 xl:py-28 2xl:py-36 sm:px-16 md:px-24 text-white rounded-3xl max-h-[40vw]' ref={ref}>
        <h2 className='sm:text-2xl lg:text-[33px] xl:text-[40px] 2xl:text-[57px] sm:w-[77%] lg:w-[55%] xl:w-[45%] 2xl:w-[49%] lg:leading-tight font-bold animate-fade-in-fast'>Order your favourite food here</h2>
        <p className='md:pt-2 xl:pt-8 2xl:pt-10 md:w-[65%] lg:w-[50%] sm:text-[11px] lg:text-[12px] xl:text-base 2xl:text-[18px] font-semibold animate-fade-in-slow'>Welcome to Zaayka, where every meal is a celebration of taste. Our mission is to deliver culinary joy to your doorstep with a diverse menu of fresh, delicious dishes. Enjoy traditional Indian flavors, international cuisines, and comforting meals.</p>
        <button className='md:text-[10px] xl:text-base md:mt-6 lg:mt-10 bg-white text-dark-coffee py-1.5 px-3 lg:py-3 lg:px-8 rounded-3xl font-semibold hover:bg-white/85 transition-all animate-fade-in duration-300'
        onClick={scrollToMenu}
        >View Menu</button>
    </div>    
  )
});

export default Hero