import React, { forwardRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'

const DownloadApp = forwardRef((props,ref) => {
  return (
    <div className='mt-16 flex flex-col items-center mb-40' ref={ref}>
        <h1 className='text-4xl xs:text-5xl xl:text-6xl font-semibold mb-10 xs:w-[70vw] md:w-1/2 lg:w-[45vw] xl:w-[41vw] text-center leading-tight pt-20 px-6 xs:px-0'>Download the app for a better experience</h1>
        <div className='flex gap-6 xs:gap-16'>
            <img src={assets.app_store} alt="app" width={200} height={70}
            className='hover:scale-105 duration-500 cursor-pointer w-[130px] xs:w-full'
            />
            <img src={assets.play_store} alt="play" width={216} height={70}
            className='hover:scale-105 duration-500 cursor-pointer w-[140px] xs:w-full'
            />
        </div>
    </div>
        
  )
});

export default DownloadApp