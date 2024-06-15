import React, { useContext, useEffect, useRef, useState } from 'react'
import { address_list, assets, coupon_list} from '../assets/frontend_assets/assets'
import { Context } from '../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {


  const {cartItems,totalAmount, platformFee, deliveryCharges, discountRate, setDiscountRate, token, food_list, url} = useContext(Context)
  const [showInputBox, setShowInputBox] = useState(false)
  const [couponCode, setCouponCode] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    area: "",
    landmark: "",
    delivery_note: "",
    delivery_time: "",
    payment_method: ""
  })

  const inputRef = useRef(null);

  const discountAmount = discountRate * totalAmount / 100;
  const grandTotal = totalAmount + platformFee - discountAmount + deliveryCharges;

  const navigate = useNavigate();

  const handleCouponButtonClick = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    setShowInputBox(false); //show the div
    const coupon = coupon_list.find(coupon => coupon.code === couponCode.toUpperCase());
    coupon ? setDiscountRate(coupon.discount) : setDiscountRate(0);
  };

  const onChangeHandler = (event) => {
    setData({
       ...data,
        [event.target.name]: event.target.value
    })
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let newItem = item;
        newItem.quantity = cartItems[item._id];
        orderItems.push(newItem);
      }
    })
    //Array of food items, each item is one entry from DB.
    // console.log(orderItems); 
    let orderData = {
      address: data,
      items: orderItems,
      amount: grandTotal
    }

    let response = await axios.post(`${url}/api/v1/order/place`, orderData, {headers: {token}})
    // console.log(response);
    if (response.data.success) {
      const {session} = response.data;
      // console.log(session.url);
      window.location.replace(session.url);
    }
    else {
      console.log(response.data.error);
    }
  }
    
  useEffect(() => {
    // console.log(inputRef.current);
    if (showInputBox && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInputBox]); //focuses on input box in one click instead of two

  // useEffect(() => console.log(data), [data]); 

  return (
    <div className='mx-32 mt-16 border bg-neutral-50'>

      {/* Header */}
      <div className='flex items-center justify-between py-10 mx-16 mb-4'>
        <Link to="/cart">
          <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-2 text-xl rounded-xl font-semibold outline-none'>Back To Cart</button>
        </Link>
        <h1 className='uppercase font-medium text-center mr-[42%] text-6xl'>Checkout</h1>
      </div>

        {/* User Info */}
        <form onSubmit={placeOrder} className='rounded-xl py-8 px-20 flex justify-between'>

          {/* Details */}
          <div className='border py-10 px-12 rounded-lg bg-neutral-200/30'>
            {/* Name & Phone */}
            <div className='mb-12'>
              <h1 className='font-semibold mb-4 text-2xl'>Contact Information</h1>
              <input required type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Name' className='py-3 px-4 mr-4 w-[48%] rounded-md outline-none'/>
              <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' className='py-3 px-4 w-[48%] rounded-md outline-none '/>
            </div>
            
            {/* Address */}
            <div className='mb-12'>
              <label htmlFor="address" className='block font-semibold mb-4 text-2xl'>Delivery Address</label>
              <select name="address" onChange={onChangeHandler} value={data.address} id="address" className='block py-2 px-4 mb-4 w-full font-normal *:font-normal bg-white rounded-md outline-none'>
                <option value="">Saved addresses</option>
                {
                  address_list.map((item, index) => (
                    <option key={index} value={item.address}>{item.address}</option>
                  ))
                }
              </select>

              <input required type="text" name='address' onChange={onChangeHandler} value={data.address} placeholder='Address' className='w-full py-2 px-4 mb-4 rounded-md'/>
              <div>
                <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' className='py-2 px-4 mb-4 rounded-md mr-7 w-[47%]' />
                <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' className='py-2 px-4 mb-4 rounded-md w-[47%]' />
              </div>
              <input required type="text" name='area' onChange={onChangeHandler} value={data.area} placeholder='Area/Street' className='py-2 px-4 mb-4 rounded-md mr-7 w-[47%]' />
              <input required type="text" name='landmark' onChange={onChangeHandler} value={data.landmark} placeholder='Landmark' className='py-2 px-4 mb-4 rounded-md w-[47%]' />
              <input required type="text" name='delivery_note' onChange={onChangeHandler} value={data.delivery_note} placeholder='Note for delivery' className='block py-2 px-4 mb-4 rounded-md w-full' />
            </div>

            {/* For radio buttons keep value as string. that value is stored in data */}
            {/* Time */}
            <div className='mb-12'>
              <h1 className='font-semibold mb-4 text-2xl'>Delivery Time</h1>
              <input required type="radio" id="soon" name="delivery_time" onChange={onChangeHandler} value="soon" className='mr-1.5 border-4 border-carrot duration-300'/>
              <label htmlFor="soon" className='mr-8 font-medium'>As soon as possible</label>

              <input required type="radio" id="select-time" name="delivery_time" onChange={onChangeHandler} value="select-time" className='mr-1.5 border-4 border-carrot duration-300'/>
              <label htmlFor="select-time" className='font-medium'>Select Time</label>
            </div>

            {/* Payment Method */}
            <div>
              <h1 className='font-semibold mb-4 text-2xl'>Payment Method</h1>  
              <input required type="radio" id="cash" name="payment_method" onChange={onChangeHandler} value="cash" className='mr-1.5 border-4 border-carrot duration-300'/>
              <label htmlFor="cash" className='mr-8 font-medium'>Cash On Delivery</label>

              <input required type="radio" id="online" name="payment_method" onChange={onChangeHandler} value="online" className='mr-1.5 border-4 border-carrot duration-300'/>
              <label htmlFor="online" className='font-medium'>Online Payment</label>
            </div>             
          </div>         
        
          {/* Order Summary */}      
          <div className='p10'>

            {/* Bill Summary */}        
            <div className='border py-6 px-8 rounded-lg text-center bg-neutral-200/30'>
              <p className='text-2xl pb-6 mb-8 border-b-2 border-neutral-300 text-center uppercase font-semibold'>Order Summary</p>
              <div className='pt-1 pb-6 grid grid-cols-4 gap-4 w-[18vw]'>
                {
                  Object.keys(cartItems).map((item, index) => {
                    const food = food_list.find(food_item => food_item._id === item) 
                    return (
                      <div className='flex flex-col gap-2 items-center font-semibold' key={index}>
                        <img src={`${url}/images/${food.foodImage}`} alt="food" className='w-[60px] h-[60px] rounded-full'/> {/*object-contain*/}
                        <p>x{cartItems[item]}</p>
                      </div>
                    )
                })
                }
              </div>
              <div className='*:my-2 *:px-2 text-xl'>
                <div className='flex justify-between items-center'>
                  <p>Subtotal</p>              
                  <p className='font-semibold'>&#8377;{ totalAmount }.00</p>
                </div>           
                <div className='flex justify-between items-center'>
                  <p>Discount</p>
                  <p className='font-semibold'>-&#8377;{discountAmount}{discountAmount % 1 === 0? ".00" : discountAmount*10 % 1 === 0? "0" : ""}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p>Delivery Charges</p>
                  <p className='font-semibold'>{deliveryCharges ===  0? "Free" : <>&#8377;{deliveryCharges}.00</>}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p>Platform Fee</p>
                  <p className='font-semibold'>&#8377;{platformFee}{platformFee % 1 === 0? ".00" : platformFee*10 % 1 === 0? "0" : ""}</p>
                </div>
                <div className='flex justify-between items-center border-t-2 border-neutral-300 mt-4 pt-2'>
                  <p>Total</p>
                  <p className='font-semibold'>&#8377;{grandTotal}{grandTotal % 1 === 0? ".00" : grandTotal*10 % 1 === 0? "0" : ""}</p>
                </div> 
              </div>
              <button type='submit' className='bg-carrot/85 hover:bg-carrot duration-300 text-white mt-6 px-6 py-2 rounded-xl text-xl font-semibold'>Place Order</button>
            </div>

            {/* Coupon Code */}
            <div>
              <div className='flex items-center'>
                <div className='my-4 border-2 border-r-0 border-dashed'
                onFocus={() => setButtonClicked(false)} 
                //Set button clicked state to false else it is always true on just clicking button once even if you change input box after that
                >
                  {
                    showInputBox? 
                    <input type='text' className='text-xl font-bold py-4 px-14 outline-none w-[16.5vw] uppercase' placeholder=""
                    value={couponCode}
                    ref={inputRef} 
                    onChange={(event) => setCouponCode(event.target.value)} 
                    />
                    :
                    <div className='text-xl font-bold py-4 outline-none w-[16.5vw] bg-white uppercase'
                    onClick={() => setShowInputBox(true)}
                    >
                      <p className={`${couponCode === "" ? "" : "ml-10"}`}>
                        {
                          couponCode === "" ? <span className='flex items-center justify-center gap-4 opacity-40 mr-6'><img src={assets.discount_icon} alt="coupon" className='rounded-full'/>Coupon Code</span> :
                          (discountRate > 0) ? <span className='flex items-center justify-between px-4'>{couponCode}<img src={assets.verified_icon} alt="verified" className='mr-4'/></span> : <span className='ml-4 opacity-40'>{couponCode}</span>
                        }
                      </p>
                    </div>
                  }
                  
                </div>
                <button
                onClick={handleCouponButtonClick}
                className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-4 text-xl font-semibold border-2 border-red-500'>Apply</button>
              </div>
              {
                buttonClicked && couponCode === "" ? 
                <p className='ml-12 text-[15px] text-dark-carrot'>Enter a Coupon Code!</p> :
                <></>
              }
              {
                !showInputBox && couponCode && (discountRate > 0? "" : 
                  <p className='ml-12 text-[15px] text-dark-carrot'>Invalid Coupon!</p> )
              }
            </div>
          </div>
          
        </form>                 
    </div>
  )
}

export default PlaceOrder