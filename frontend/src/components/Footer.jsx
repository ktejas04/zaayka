import React, { forwardRef } from 'react'
import { assets, links, socials } from '../assets/frontend_assets/assets'
import logo from "../assets/zaayka.svg"

const Footer = forwardRef((props, ref) => {
  return (
    <div className='mt-28' ref={ref}>
        <div className='bg-zinc-100 pt-10 px-6 sm:px-12 md:px-16 lg:px-14 xl:px-32 text-center'>
            {/* Newsletter */}
            <div className='my-10 flex flex-col xs:flex-row justify-around md:items-center gap-4'>
                <div className='xs:w-6/12'>
                    <p className='text-xl md:text-[22px] lg:text-2xl pb-2 font-semibold'>Subscribe to our Newsletter</p>
                    <p className='text-sm md:text-base'>Get updates regarding offers, openings and more!</p>
                </div>
                <form className='xs:w-6/12 flex items-center justify-center xs:flex-col md:flex-row gap-3'>
                    <input type="text" placeholder='Enter email address' 
                    className='p-4 outline-none rounded-md xs:w-9/12 lg:w-2/5 xl:w-1/2 text-sm md:text-base'
                    />
                    <button className='bg-carrot/85 hover:bg-carrot text-white duration-300 border px-6 py-3 rounded-full outline-none font-semibold text-sm md:text-base xs:w-9/12 md:w-auto'>
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Links */}
            <div className='grid grid-cols-3 gap-10 pb-10 border-b-2 border-neutral-300'>
                {
                    links.map((item, index) => (
                        <div key={index}>
                            <h1 className="text-sm xs:text-[18px] uppercase tracking-tight mb-2 font-semibold">
                                {item.title}
                            </h1>
                            <ul>
                                {
                                    item.items.map((link, index) => (
                                        <li key={index} className="cursor-pointer hover:text-black/60 text-xs xs:text-sm md:text-base">
                                            {link}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
                                       
            </div>

            <div className='pb-4 mt-10'>
                {/* Socials */}
                <div className='flex justify-center gap-3 xs:gap-6 sm:gap-8 mb-8'>
                    {
                        socials.map((item, index) => (
                            <a href={item.link} key={index} target='_blank'><img src={item.icon} alt={item.name} 
                            width={48}
                            className='border rounded-full p-2 cursor-pointer hover:bg-neutral-200/70 w-10 xs:w-12'
                            /></a>
                        ))
                    }
                </div>

                {/* Copyrights */}
                <p className='text-center text-sm xs:text-base'>&copy; 2024 Zaayka Pvt. Ltd | All rights reserved.</p>
            </div>
        </div>
    </div>
  )
});

export default Footer