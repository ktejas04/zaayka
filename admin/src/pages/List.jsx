import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({url}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getFoodList();
  }, []);


  // Empty dependency array means this effect runs once after the initial render

  const getFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/food/list`);
      // console.log(response.data.data);
      response.data.success ? setList(response.data.data) : toast.error("Error getting list")
    } catch (error) {
      toast.error("Error fetching data");
    }
  }

  const removeFoodItem = async (id) => {

    /* 
      const foodItem = await axios.post(`${url}/api/v1/food/delete/${id}`)
      await getFoodList();        
    */
    try {
      // console.log("Cross clicked! ", id);
      setList(list.filter(foodItem => foodItem._id != id));
      const foodItem = await axios.post(`${url}/api/v1/food/delete/${id}`)
      if (foodItem.data.success) {
        // console.log(foodItem);
        toast.success(foodItem.data.message);
      } else {
        toast.error(foodItem.data.message);
      }
    } catch (error) {
      console.log("Error deleting food item: ", error);
    }
  }


  return (
    <div className='px-32 mt-20 w-4/5'>
      <p className='text-4xl mb-8 font-semibold'>Food Catalogue</p>
      <div className='flex justify-around text-[26px] py-4 pl-[1.75rem] pr-32 border-b-2 border bg-neutral-100 font-medium'>
          <p>Item</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
      </div>
      <div>
        {list.map((item, index) => (
            <div className='flex gap-[9.5rem] items-center text-xl pl-[6.5rem] pr-12 py-6 border-b-2 *:text-center' key={index}>
                <p><img src={`${url}/images/${item.foodImage}`} alt="food-image"
                className='w-24 h-24 object-cover rounded-full'
                /></p>
                <p className='ml-8 w-20'>{item.name}</p>
                <p className='w-28 ml-12'>{item.category}</p>
                <p className='w-20 ml-10'>&#8377;{item.price}</p>
                <p className=''><img src={assets.close_icon} alt="close-icon" 
                className='cursor-pointer hover:opacity-60 duration-300'
                onClick={() => removeFoodItem(item._id)}
                /></p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default List;
