import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../context/Context';
import axios from 'axios';

const Verification = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    console.log(success, orderId);
    const {url} = useContext(Context)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/v1/order/verify`, {success, orderId})
        if (response.data.success){
            navigate('/my-orders');
        }
        else {
            navigate('/');
        }
    }
    
    //Run verifyPayment when component is loaded
    useEffect(() => {
        setTimeout(
            verifyPayment,1500
        );
    },[]);

  return (
    <div className="min-h-[60vh] grid ">
        {/* Spinner */}
        <div className='w-24 h-24 place-self-center border-[5px] border-neutral-100 border-t-carrot rounded-full animate-spin'>

        </div>
    </div>
  )
}

export default Verification