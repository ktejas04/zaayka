import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(`${url}/api/v1/order/all-orders`);
    if (response.data.success){
      // console.log(response.data.orders);
      setOrders(response.data.orders);
    }
    else {
      console.log(response.data);
      console.log("ERROR : ", response.data.error);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    if (showSpinner){
    fetchAllOrders();
    setTimeout(() => setShowSpinner(false), 800);
    }
    return () => {};
  }, [showSpinner]);


  const statusHandler = async (event, orderId) => {
    // console.log(event.target.value);
    const response = await axios.post(`${url}/api/v1/order/change-status/`, { orderId, status: event.target.value});
    if (response.data.success) {
      console.log(response.data);
      toast.success(response.data.message);
      await fetchAllOrders();
    }
    else {
      console.log(response.data);
      console.log("ERROR : ", response.data.error);
      toast.error(response.data.message);
    }
  };

  return (
    <div className='w-full'>
      {
      showSpinner ? (
      <div className="min-h-[60vh] grid ">
         <div className='w-24 h-24 place-self-center border-[5px] border-neutral-100 border-t-carrot rounded-full animate-spin'>
         </div>
      </div> ) : (
      <div className='px-32 py-24 border'>
        <div className='flex justify-between items-center mb-16 py-6'>
          <h1 className='text-5xl font-semibold'>All Orders</h1>
          <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-6 py-2 rounded-xl text-xl font-semibold'
          onClick={()=> {
            fetchAllOrders();
            setShowSpinner(true);
          }}
          >Refresh Orders</button>
        </div>
        {
          orders.map(order => (
            <div key={order._id} className='flex items-start justify-around text-base  mb-4 rounded-xl bg-neutral-100 border border-neutral-400 px-8 py-6 w-full'>
              <p><img src={assets.parcel_icon} alt="parcel" /></p>
              <div className='flex flex-col'>
                <p className='flex flex-col w-[12vw] mb-10 text-base font-medium mt-3'>
                  {
                    order.items.map((foodItem,index) => (
                      <span key={index}>{foodItem.name} x {foodItem.quantity}</span> //key={foodItem._id}
                    ))
                  }
                </p>
                <p className='font-semibold text-xl mb-3'>{order.address.name}</p>
                <p>{order.address.address+", "}</p>
                {/* <p>{order.address.landmark+", "}</p> */}
                <p>{order.address.city + "," + order.address.state}</p>
                <p className='mt-6 text-xl font-semibold'>{order.address.phone}</p>
              </div>
              <p className='text-2xl font-semibold mt-2'>&#8377;{order.amount}</p>
              <select name="status" className='py-2 px-4 rounded-md border-2 border-dark-carrot bg-carrot/85 hover:bg-carrot cursor-pointer *:hover:cursor-pointer text-white font-bold' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Processing">Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        }      
      </div> )
      }      
    </div>
   
  )
}

export default Orders