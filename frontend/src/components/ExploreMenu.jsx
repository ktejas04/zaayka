import React, { forwardRef, useRef, useState } from 'react'
import { assets, menu_list } from "../assets/frontend_assets/assets"
import FoodCatalog from './FoodCatalog'

const ExploreMenu = forwardRef(({category, setCategory},ref) => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
    setScrollPosition(containerRef.current.scrollLeft);
  };

  return (
    <div className="px-10 sm:px-12 md:px-16 lg:px-14 xl:px-32 pb-16 mt-20 pt-10 mb-16" ref={ref}>
      {/* Menu Heading and Categories*/}
      <h1 className='text-dark-coffee text-4xl font-bold mb-10 py-2 text-center lg:text-left'> 
        Explore Our Menu
      </h1>
      <p className='text-xl xl:w-4/5 2xl:w-3/5 text-coffee text-center lg:text-left'>
        Discover the culinary wonders of Zaayka with our extensive menu. From spicy Indian curries to global delicacies, each dish is crafted with the freshest ingredients and traditional recipes. 
      </p>
      <div className='mt-16 pb-16 flex justify-between gap-[2rem] md:gap-10 lg:gap-3 border-b-2 border-slate-300 overflow-x-scroll hide-scroll'>
        {/* <div>
          <img src={assets.arrow_left} alt="left" width={30}
           className='absolute top-[20%] left-0 bg-neutral-300 rounded-full mr-4 xl:hidden '
          />
        </div> */}
        {menu_list.map((item, index) => (
          // console.log(item)
          // console.log(index)
          <div className='flex flex-col items-center gap-5 cursor-pointer min-w-28 lg:min-w-44 xl:min-w-48' key={index}
            onClick={() => setCategory(prev => prev===item.menu_name?"All":item.menu_name)}
          >
            <img src={item.menu_image} alt={item.menu_name} 
            width={120}
            className= {category===item.menu_name? "border-4 border-carrot rounded-full p-1" : ""}
            />
            <p className={`text-base md:text-[18px] xl:text-xl text-coffee text-center ${category===item.menu_name? "font-bold" : "font-semibold"}`}>{item.menu_name}</p>        
          </div>
        ))}      
        {/* <div className='bg-neutral-300 absolute top-[20%] -right-3 bg-neutral-30 rounded-full mr-4 xl:hidden flex justify-end'>
          <img src={assets.arrow_right} alt="right" width={30} height={30} />
        </div>   */}
      </div>
    </div>
  )
});

export default ExploreMenu