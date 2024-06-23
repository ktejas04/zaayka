import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'
import { assets, coupon_list, socials } from '../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const Cart = () => {

  // console.log("Cart component loaded");

  const {cartItems, addToCart, removeFromCart,  deleteFromCart, clearCart, totalAmount, platformFee, deliveryCharges, discountRate, setDiscountRate, food_list, couponCode, setCouponCode } = useContext(Context)
  // const [deliveryCharges, setDeliveryCharges] = useState(0)
  // const [discountRate, setDiscountRate] = useState(5)  //in percentage
  const [showInputBox, setShowInputBox] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const inputRef = useRef(null);


  const navigate = useNavigate();

  const location_icon = socials[socials.length - 1];

  const discountAmount = discountRate * totalAmount / 100;
  const grandTotal = totalAmount + platformFee - discountAmount + deliveryCharges;

  const handleButtonClick = () => {
    setButtonClicked(true);
    setShowInputBox(false);
    const coupon = coupon_list.find(coupon => coupon.code === couponCode.toUpperCase());
    coupon ? setDiscountRate(coupon.discount) : setDiscountRate(0);
    };
    
  useEffect(() => {
    // console.log(inputRef.current);
    if (showInputBox && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInputBox]);

  useScrollToTop();
  
  
  return (
    <div className='px-32 mt-32'>
      

      {/* Items List */}
      <div className='border bg-neutral-100 py-16 px-20'>

        {/* Cart Header */}
        <div className='flex justify-between text-2xl mb-16'>
          <p className='text-5xl uppercase font-semibold'>My Cart</p>
          <div className='flex items-center'>
            <img src={location_icon} alt="location" 
            className='inline-block mr-2'
            /> 
            <p className='text-base'>Deliver to </p>
            <form action="">
              <input type="text" placeholder='Enter Pincode'
              className='mx-3 text-base w-36 px-2 py-1 border rounded-md'
              />
              <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-1 rounded-xl text-base font-semibold'>
                Check
              </button>
            </form>
          </div>          
        </div>

        {/* Fields */}
        {
          Object.keys(cartItems).length === 0 ?
          <><div className='flex justify-center items-center gap-6 mt-24'>
            <img src={assets.empty_cart_icon} alt="empty-cart" width={50}/>
            <p className='text-3xl font-semibold'>Your cart is empty</p>
          </div>
          <Link to="/"><button className='ml-[45%] mt-8 text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'>Order Now!</button></Link>
          </>   :
          <div className='flex justify-between text-2xl pb-6 border-b-2'>
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className='ml-2'>Total</p>
          <p className='w-20'></p>
        </div>
        }
        

        {/* Items */}
        {
          // cartItems.map()
          Object.keys(cartItems).length > 0 &&

          food_list.map((item, index) => {

            

            if (item._id in cartItems) { //cart
              return (
                <div className='flex items-center :border gap-10 text-[18px] my-4 pb-6 border-b-2' key={index}>
                <p className='mr-16'><img src={item.image} alt="item-image" width={70}/></p>
                <p className='ml-6 mr-2 w-52 text-center'>{item.name}</p>
                <p className='mx-[6.35rem] w-8'>{item.price}</p>
                <p className='mx-[5.5rem] flex justify-around items-center w-24 cursor-pointer'>
                  <img src={assets.subtract_icon} alt="subtract"
                  className='hover:opacity-50 duration-300'
                  onClick={() => {
                    removeFromCart(item._id);
                    }} />
                  <span className='bg-white w-8 text-center'
                  >
                    {cartItems[item._id]}
                  </span>
                  <img src={assets.add_icon} alt="add"
                  className='hover:opacity-50 duration-300'
                  onClick={() => {
                    addToCart(item._id);
                  }} />
                </p>
                <p className='mx-[7rem] w-8'>{item.price * cartItems[item._id]}</p>
                <p className='ml-28 cursor-pointer hover:opacity-50 duration-300'
                onClick={() => deleteFromCart(item._id)}
                ><img src={assets.close_icon} alt="" /></p>
                </div>
              )
            }
          })
        }

        {/* Clear Cart and Back to Menu*/}
        {
          Object.keys(cartItems).length > 0 &&

          <div className='flex justify-between mt-14'>
            <Link to="/"><button
            className='text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'
            >Back To Menu</button></Link>
            <button
            onClick={() => clearCart()}
            className='text-xl font-semibold text-white border py-2 px-4 rounded-xl bg-carrot/85 hover:bg-carrot'>Clear All</button>
          </div>
        }
      </div>

      {/* Cart Bottom - PromoCode and Bill */}

      {
        Object.keys(cartItems).length > 0 &&
      <div className='flex justify-between items-center mt-24'>

        {/* Coupon Code */}
        <div>
            <div className='flex items-center'>

              {/* Coupon Code Area */}
              <div className='my-4 border-2 border-r-0 border-dashed'
              onFocus={() => setButtonClicked(false)}
              >
                {
                  showInputBox? 
                  <input type='text' className='text-xl font-bold py-4 px-14 outline-none w-[16.5vw] uppercase' placeholder=""
                  value={couponCode}
                  ref={inputRef} 
                  onChange={(event) => setCouponCode(event.target.value)} 
                  />
                  :
                  <div className='text-xl font-bold py-4 outline-none w-[16.5vw] bg-white uppercase cursor-text'
                  onClick={() => setShowInputBox(true)}
                  >
                    <p className={`${couponCode === "" ? "" : "ml-10"}`}>
                      {
                        couponCode === "" ? <span className='flex items-center justify-left gap-4 px-10 opacity-40'><img src={assets.discount_icon} alt="coupon" className='rounded-full'/>Coupon Code</span> :
                        (discountRate > 0) ? <span className='flex items-center justify-between px-4'>{couponCode}<img src={assets.verified_icon} alt="verified" className='mr-4'/></span> : <span className='ml-4 opacity-40'>{couponCode}</span>
                      }
                    </p>
                  </div>
                }
                
              </div>

              {/* Apply Button */}
              <button
              onClick={handleButtonClick}
              className='bg-carrot/85 hover:bg-carrot duration-300 text-white px-4 py-4 text-xl font-semibold border-2 border-red-500'>Apply</button>
            </div>
            {/* Error Messages */}
            <div className='h-5 w-full'>

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

        {/* Bill Summary */}
        
        <div className='border py-4 px-10 rounded-lg text-center bg-neutral-100'>
          <p className='text-2xl pb-4 mb-8 border-b-2 border-neutral-300 text-center uppercase font-semibold'>Order Summary</p>
          <div className=' *:gap-32 *:my-3 text-xl '>
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
          <button className='bg-carrot/85 hover:bg-carrot duration-300 text-white mt-6 px-6 py-2 rounded-xl text-xl font-semibold'
            onClick={() => navigate("/order")}
          >Proceed To Checkout</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Cart

