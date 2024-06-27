import React, { useContext, useEffect, useState } from 'react'
import rating from '../assets/frontend_assets/rating_starts.png'
import { assets } from '../assets/frontend_assets/assets'
import { Context } from '../context/Context'

const FoodItem = ({id,name,description,price,image}) => {

    const [time, setTime] = useState(0);
    const [rating, setRating] = useState("");

    const updateRatingTime = () => {
        setTime(Math.floor(Math.random()*30 + 10));
        let calculatedRating = (Math.random() * 2 + 3);
        // console.log(calculatedRating);
        calculatedRating = (Math.floor(calculatedRating*10)/10).toFixed(1);
        // console.log(calculatedRating);
        setRating(calculatedRating);
        // rating < 1 && setRating(prev => prev + 1);
    }
    
    useEffect(() => {
        updateRatingTime();
        
        return () => {};
    },[]);
    
    // console.log(time, rating);
    // rating < 1 && (()=>setRating(prev => prev + 1));
    // const time = Math.floor(Math.random()*30 + 10)
    const {cartItems, addToCart, removeFromCart, url} = useContext(Context);
    // console.log(image);

    const ratingColour = ((rating) => {
        // console.log(rating, Math.floor(rating), Number((rating - Math.floor(rating)).toFixed(1)));
        const value = (rating % Math.floor(rating)).toFixed(1) * 1000;
        // console.log(value, rating);  
        switch (Math.floor(rating)) {
                            
            case 3:
                if (value < 500){
                    // return(`bg-red-${value}`);
                    return("bg-lime-700");
                }
                else {
                    return("bg-lime-800");
                }
                
            case 4:
                if (value <500){
                    // return(`bg-red-${value}`);
                    return("bg-green-700");
                }
                else {
                    return("bg-green-800");
                }
                
            default:
                return("bg-blue-300");
                
        }
    })(rating);

    // console.log(ratingColour);
    

  return (
    <div key={id} className='border mb-6 md:mb-2 rounded-3xl w-[300px] xs:w-[240px] sm:w-[260px] md:w-[300px] xl:w-full 2xl:max-w-[300px] cursor-pointer hover:shadow-2xl transition-all duration-300'>
        
        {/* Food Image */}
        <div className=''>
            <img src={image} alt={name}
            width={300} height={300}
            className='rounded-t-3xl'/>

            {/* {console.log(itemCount)}*/}
            {/* Item Adder Subtracter */}
            {/* {cartItems[id] && console.log(cartItems[id])} */}
            {/* {
                // !itemCount?
                !cartItems[id]?
                <img src={assets.add_icon_white} alt="icon"
                onClick={() => addToCart(id)} 
                className='absolute w-10 bottom-2 right-2 opacity-75 hover:opacity-100 rounded-full'
                /> : <div className='absolute bottom-2 right-2 bg-white rounded-3xl p-1 mt-3 ml-5 flex gap-3 items-center'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="red" />
                        {/* <p>{itemCount}</p> 
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="green" />
                     </div>
            } */}
        </div>

        {/* Name and Rating */}
        <div className=' py-4 px-6'>
        
        <div className='flex flex-row items-center justify-between font-semibold mb-4 gap-2 lg:gap-0'>
            <h2 className='text-dark-coffee'>{name}</h2>
            {/* {console.log(ratingColour, typeof(ratingColour))} */}
            {/* <span className={ratingColour}>{rating} ★</span> */}
            <span className={`${ratingColour} text-white px-1 rounded-md`}>{rating} ★</span>
            {/* <img src={rating} alt="rating" /> ${ratingColour(rating)} `${ratingColour} text-white py-0.5 px-1`*/}
        </div>

        {/* Description and Delivery Time */}
        <div className='flex justify-between items-center gap-3 mb-5'>
            <p className='text-coffee text-sm font-medium'>{description}</p>
            <p className='bg-parrot-green hover:bg-dark-parrot-green py-1 px-2 rounded-full text-[12px] border text-white text-center font-semibold max-w-12'>{time} mins</p>
        </div>

        {/* Price and Count */}
        <div className='flex justify-between items-center'>
            <p className='text-xl 2xl:text-2xl font-bold text-carrot'>₹{price}</p>
            {/* <div className='flex gap-2'>
                {
                    tag && tag.map((tagName, index) => (
                            <p key={index}
                            className='border rounded-3xl text-sm text-parrot-green font-semibold py-1 px-3 hover:bg-neutral-50'
                            >{tagName}</p>
                    ))
                }
            </div> */}

            {/* Item Adder Subtracter */}
            {
                // !itemCount?
                !cartItems[id]?
                <img src={assets.add_icon_white} alt="icon" width={40}
                onClick={() => addToCart(id)} 
                className='bottom-2 right-2 opacity-65 hover:opacity-100 rounded-full bg-gray-300'
                /> :
                <div className='bg-white border-2 border-neutral-100 rounded-3xl p-1 mt-3 ml-5 flex gap-3 items-center'>
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="red" />
                    {/* <p>{itemCount}</p> */}
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="green" />
                </div>
            }
            
        </div>

        </div>
    </div>
  )
}

export default FoodItem