import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";

const Login = ({setAllowLogin}) => {

    const [data, setData] = useState({
        adminId : "",
        password: ""
    });

    const url="http://localhost:8000"

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData(data => ({
            ...data,
            [event.target.name]: event.target.value
        }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/v2/admin/login`, {adminId: data.adminId, password: data.password});
            if (response.data.success) { 
                setAllowLogin(true);
                toast.success(response.data.message);
                navigate('/');
                // window.location.reload();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    // useEffect(()=>{
    //     if (allowLogin){
    //         navigate('/');
    //     }
    // },[]);


    // useEffect(()=>{
    //     console.log(data);

    //     return ()=>{}
    // },[data]);

  return (
    <div className='mx-64 py-10 rounded-2xl bg-carrot/20 mt-24 flex flex-col items-center border'>
        <h1 className='text-6xl mb-12 text-carrot font-bold'>Welcome to Zaayka Admin Panel</h1>
        <h2 className='text-4xl text-dark-coffee/75 font-semibold'>Please Login to continue</h2>

        {/* Card */}
        <div className="bg-gray-100 flex items-center justify-center mt-20 rounded-xl min-w-[25vw]">
            <div className=" w-full py-8 px-12 bg-neutral-100 rounded-lg hover:shadow-xl cursor-pointer">
                <h2 className="text-5xl font-semibold mb-10 text-center text-carrot/75">Admin Login</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4 text-coffee/75 text-xl">
                        <label htmlFor="adminId" className="block mb-4 font-medium text-3xl text-center">Admin ID</label>
                        <input onChange={onChangeHandler} value={data.adminId}
                        type="text" id="adminId" name="adminId" className="mt-1 block w-full px-3 py-2 border border-carrot/85 rounded-md shadow-sm focus:outline-none focus:border-dark-carrot focus:ring focus:ring-carrot focus:ring-opacity-50" />
                    </div>
                    <div className="mt-8 mb-6 text-coffee/75 text-xl">
                        <label htmlFor="password" className="block mb-4 font-medium text-3xl text-center">Password</label>
                        <input onChange={onChangeHandler} value={data.password}
                        type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-carrot/85 rounded-md shadow-sm focus:outline-none focus:border-dark-carrot focus:ring focus:ring-carrot focus:ring-opacity-50" />
                    </div>
                    <button type="submit" className="w-full text-white font-semibold text-xl mt-3 py-2 px-4 rounded-md bg-carrot/85 focus:outline-none hover:bg-carrot">Login</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login