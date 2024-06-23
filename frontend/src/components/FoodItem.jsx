import React, { useContext, useEffect, useState } from 'react'
import rating from '../assets/frontend_assets/rating_starts.png'
import { assets } from '../assets/frontend_assets/assets'
import { Context } from '../context/Context'

const FoodItem = ({id,name,description,price,image}) => {

    const [time, setTime] = useState(0)
    useEffect(() => {
      setTime(Math.floor(Math.random()*30 + 10))
    }, []);
    // const time = Math.floor(Math.random()*30 + 10)
    const {cartItems, addToCart, removeFromCart, url} = useContext(Context);
    // console.log(image);


  return (
    <div key={id} className='border mb-2 rounded-3xl max-w-[18vw] cursor-pointer hover:shadow-2xl transition-all [60vh]'>
        <div className='relative'>
            <img src={image} alt={name}
            className='rounded-t-3xl'/>

            {/* {console.log(itemCount)}*/}
            {/* Item Adder Subtracter */}
            {/* {cartItems[id] && console.log(cartItems[id])} */}
            {
                // !itemCount?
                !cartItems[id]?
                <img src={assets.add_icon_white} alt="icon"
                onClick={() => addToCart(id)} 
                className='absolute w-10 bottom-2 right-2 opacity-85 hover:opacity-100 rounded-full duration-300'
                /> : <div className='absolute bottom-2 right-2 bg-white rounded-3xl p-1 mt-3 ml-5 flex gap-3 items-center'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="red" />
                        {/* <p>{itemCount}</p> */}
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="green" />
                     </div>
            }
        </div>

        <div className=' py-4 px-6'>
        
        <div className='flex items-center justify-between font-semibold mb-4'>
            <h2 className='text-dark-coffee'>{name}</h2>
            <img src={rating} alt="rating" />
        </div>

        <div className='flex justify-between items-center gap-3 mb-5'>
            <p className='text-coffee w-[70%]'>{description}</p>
            <p className='bg-parrot-green hover:bg-dark-parrot-green py-1 px-2 rounded-3xl text-[10px] text-white font-semibold'>{time} mins</p>
        </div>

        <div className='flex justify-between items-center'>
        <p className='text-2xl font-bold text-carrot'>₹{price}</p>
        {/* <div className='flex gap-2'>
            {
                tag && tag.map((tagName, index) => (
                        <p key={index}
                        className='border rounded-3xl text-sm text-parrot-green font-semibold py-1 px-3 hover:bg-neutral-50'
                        >{tagName}</p>
                ))
            }
        </div> */}
        </div>

        </div>
    </div>
  )
}

export default FoodItem