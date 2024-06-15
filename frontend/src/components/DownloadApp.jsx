import React, { forwardRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'

const DownloadApp = forwardRef((props,ref) => {
  return (
    <div className='mt-16 flex flex-col items-center mb-40' ref={ref}>
        <h1 className='text-6xl font-semibold mb-10 w-[40vw] text-center leading-tight pt-20'>Download the app for a better experience</h1>
        <div className='flex gap-16'>
            <img src={assets.app_store} alt="app" 
            className='hover:scale-105 duration-500 cursor-pointer'
            />
            <img src={assets.play_store} alt="play" 
            className='hover:scale-105 duration-500 cursor-pointer'
            />
        </div>
    </div>
        
  )
});

export default DownloadApp