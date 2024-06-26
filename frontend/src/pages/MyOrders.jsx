import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import axios from 'axios';
import { assets } from '../../../admin/src/assets/assets';
import useScrollToTop from '../hooks/useScrollToTop';
import { toast } from 'react-toastify';
import useAuthRedirect from '../hooks/useAuthRedirect';


const MyOrders = ({setShowLoginSignup}) => {

  // console.log("My Orders component loaded");


  const [orders, setOrders] = useState([]);
  const {url, token} = useContext(Context);


  const fetchAllOrders = async () => {
    try { 
      const response = await axios.get(`${url}/api/v1/order/list`, {headers: {token}});
      // console.log("DATA :\n ", response.data.orders);
      // console.log("JSON DATA :\n ", response.json);
      // console.log("HEADERS :\n ", response.headers);
      if (response.data.success){
        setOrders(response.data.orders);
      }
      else {
        toast.error(response.data);
        console.log("ERROR : ", response.data.error);
        // toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("ERROR : ", error);
    }
  }

  const trackOrderStatus = async (orderId) => {
    try { 
      const response = await axios.post(`${url}/api/v1/order/track`, {orderId}, {headers: {token}});
      if (response.data.success){
        const updatedOrder = response.data.order;
        setOrders(prev => prev.map(order => (order._id === orderId && order.status !== updatedOrder.status) ? updatedOrder : order));
      }
      else {
        toast.error(response.data);
        console.log("ERROR : ", response.data.error);
        // toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("ERROR : ", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }

    return () => {};
  }, [token]);

  useEffect(() => {
    setShowLoginSignup(false);
  },[]);


  const {showMessage, showSpinner} = useAuthRedirect(token, "/");
  // console.log(token, showMessage, showSpinner);


  const orderStatusColour = (status) => {
    switch (status) {
      case 'Out for Delivery':
        return 'text-amber-400';
      case 'Delivered':
        return 'text-green-400';
      case 'Cancelled':
        return 'text-red-700';
      default:
        return 'text-carrot/70';
    }
  }

  useScrollToTop();

  return (
    <div className='mt-24 px-6 sm:px-12 md:px-16 lg:px-14 xl:px-32 py-16'>
    
    {/* Show Authentication Error */}
    {showMessage && (
      <div className="mt-[30vh] mb-[20vh] mx-auto bg-red-700 text-white text-2xl font-bold text-center p-4 rounded-md max-w-[40vw]">
      You are not authenticated, please login!
      </div>
    )}

    {/* Until token is available, display loading animation */}
    {showSpinner && (
       <div className="min-h-[60vh] grid ">
          <div className='w-24 h-24 place-self-center border-[5px] border-neutral-100 border-t-carrot rounded-full animate-spin'>
          </div>
        </div>
    )}

    {/* If token is available, fetch data and display orders */}
    {
      !showMessage && !showSpinner &&
      <div>
        <h1 className='text-5xl font-semibold'>My Orders</h1>
        
        <div className='mt-10 font-medium text-xl'>
          {
            orders.map(order => {
              // console.log(order);
              return (
                <div key={order._id} className='grid grid-cols-3 gap-10 place-items-center lg:flex lg:justify-around lg:items-center border rounded-xl bg-neutral-100 border-neutral-400 py-8 px-6 mb-8'>
                  <img src={assets.parcel_icon} alt="parcel" />
                  <p className='flex flex-col items-center w-44'>
                    {
                      order.items.map((foodItem,index) => (
                        <span key={index} className='text-xs xs:text-sm text-center'>{foodItem.name} x {foodItem.quantity}</span> //key={foodItem._id}
                      ))
                    }
                  </p>
                  <p className='w-24 text-sm xs:text-base xl:text-xl ml-12 xs:ml-6 lg:ml-0'>&#8377;{order.amount}</p>
                  <p className=' w-24 text-sm xs:text-base xl:text-xl'>Items : {order.items.length}</p>
                  <p className='font-bold text-neutral-600 w-32 text-sm xs:text-base xl:text-xl'>
                    <span
                    className={`mr-3 ${orderStatusColour(order.status)}`}
                    >&#x25cf;</span>{order.status}
                  </p>
                  <button onClick={()=>trackOrderStatus(order._id)} className='flex gap-0.5 xs:gap-2 items-center bg-carrot/85 hover:bg-carrot *:opacity-100 *:hover:opacity-85 duration-300 text-white px-2 lg:px-5 py-2 rounded-xl text-xs xs:text-sm lg:text-base xl:text-xl font-semibold lg:w-44'><img src={assets.location_icon} alt="location" width={18} className=' w-3 lg:w-[18px]'/><span className='hidden xs:block'>Track Order</span><span className='block xs:hidden'>Track</span></button>
                </div>
              )
            })
          }
        </div>
      </div>
    }      
    </div>
  )
}

export default MyOrders