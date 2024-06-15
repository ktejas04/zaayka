import React, { forwardRef } from 'react'
import { assets, menu_list } from "../assets/frontend_assets/assets"
import FoodCatalog from './FoodCatalog'

const ExploreMenu = forwardRef(({category, setCategory},ref) => {
  return (
    <div className="px-32 pb-16 mt-20 pt-10 mb-16" ref={ref}>
      {/* Menu Heading and Categories*/}
      <h1 className='text-dark-coffee text-4xl font-bold mb-10'> 
        Explore Our Menu
      </h1>
      <p className='text-xl w-[60%] text-coffee'>
        Discover the culinary wonders of Zaayka with our extensive menu. From spicy Indian curries to global delicacies, each dish is crafted with the freshest ingredients and traditional recipes. 
      </p>
      <div className='mt-16 pb-16 flex justify-between border-b-2 border-slate-300'>
		{menu_list.map((item, index) => (
			// console.log(item)
			// console.log(index)
			<div className='flex flex-col items-center gap-5 cursor-pointer' key={index}
				onClick={() => setCategory(prev => prev===item.menu_name?"All":item.menu_name)}
			>
				<img src={item.menu_image} alt={item.menu_name} 
				width={120}
				className= {category===item.menu_name? "border-4 border-carrot rounded-full p-1" : ""}
				/>
                <p className={`text-2xl text-coffee ${category===item.menu_name? "font-bold" : "font-semibold"}`}>{item.menu_name}</p>
			</div>
		))}
      </div>
    </div>
  )
});

export default ExploreMenu