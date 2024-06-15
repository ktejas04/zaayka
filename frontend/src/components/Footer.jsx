import React, { forwardRef } from 'react'
import { assets, socials } from '../assets/frontend_assets/assets'
import logo from "../assets/zaayka.svg"

const Footer = forwardRef((props, ref) => {
  return (
    <div className='mt-28' ref={ref}>
        <div className='bg-zinc-100 pt-10 px-32'>
            <div className='pb-8 mb-10 flex items-start justify-around border-b-2 border-coffee'>
                {/* Icon and Name */}
                <div>
                    <img src={logo} alt="logo" 
                    width={200}
                    className='p-4 cursor-pointer'
                    />
                </div>

                {/* Links */}
                <div className='grid grid-cols-3 gap-10 ml-[20rem]'>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Company</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">About Us</li>
                            <li className="cursor-pointer hover:text-black/60">Our Team</li>
                            <li className="cursor-pointer hover:text-black/60">Blog</li>
                            <li className="cursor-pointer hover:text-black/60">Report Fraud</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Our Services</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">Food Delivery</li>
                            <li className="cursor-pointer hover:text-black/60">Catering Services</li>
                            <li className="cursor-pointer hover:text-black/60">Party Orders</li>
                            <li className="cursor-pointer hover:text-black/60">Subscription Plans</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Community</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">Events & Promotions</li>
                            <li className="cursor-pointer hover:text-black/60">Partner Restaurants</li>
                            <li className="cursor-pointer hover:text-black/60">Customer Stories</li>
                            <li className="cursor-pointer hover:text-black/60">Charitable Initiatives</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Resources</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">FAQs</li>
                            <li className="cursor-pointer hover:text-black/60">Delivery Information</li>
                            <li className="cursor-pointer hover:text-black/60">How It Works</li>
                            <li className="cursor-pointer hover:text-black/60">Nutrition Information</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Contact Us</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">Help & Support</li>
                            <li className="cursor-pointer hover:text-black/60">Partner with us</li>
                            <li className="cursor-pointer hover:text-black/60">Ride with us</li>
                            <li className="cursor-pointer hover:text-black/60">Feedback</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-[19px] uppercase tracking-tight mb-2 font-semibold">Learn More</h1>
                        <ul className="*:text-[15px]">
                            <li className="cursor-pointer hover:text-black/60">Privacy Policy</li>
                            <li className="cursor-pointer hover:text-black/60">Security</li>
                            <li className="cursor-pointer hover:text-black/60">Terms</li>
                            <li className="cursor-pointer hover:text-black/60">Sitemap</li>
                        </ul>
                    </div>                            
                </div>

                {/* Newsletter */}
                <div className='mt-20 ml-20'>
                    <p className='text-3xl pb-2 font-semibold'>Subscribe to our Newsletter</p>
                    <p className='pb-6'>Get updates regarding offers, openings and more!</p>
                    <form action="" className=' inline-block mr-4'>
                        <input type="text" placeholder='Enter email address' 
                        className='p-4 outline-none text-[18px] w-[16vw]'
                        />
                    </form>
                    <button className='bg-carrot hover:bg-carrot/85 border px-8 py-4 rounded-full text-xl outline-none font-semibold'>
                        Subscribe
                    </button>
                </div>
            </div>

            <div className='mb-4'>
                {/* Socials */}
                <div className='flex justify-center gap-8 mb-8'>
                    {
                        socials.map((item, index) => (
                            <img src={item} alt={item} key={index} 
                            width={45}
                            className='border rounded-full p-2 cursor-pointer hover:bg-neutral-200/70'
                            />
                        ))
                    }
                </div>

                {/* Copyrights */}
                <p className='text-center'>&copy; 2024 Zaayka Pvt. Ltd | All rights reserved.</p>
            </div>
        </div>
    </div>
  )
});

export default Footer