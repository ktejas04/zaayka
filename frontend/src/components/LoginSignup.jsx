import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const LoginSignup = ({setShowLoginSignup}) => {

  const [currState, setCurrState] = useState("Sign In");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {url, setToken, setName} = useContext(Context);
  const action = currState === "Sign In" ? "login" : "register";


  const onChangeHandler = (event) => {
    setData(data => ({
      ...data,
      [event.target.name]: event.target.value
    }));
  }

  // useEffect(() => console.log(currState), [currState])
  // useEffect(() => console.log(data), [data])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
   

    try {
      const response = await axios.post(`${url}/api/v1/user/${action}`, data);
      if (response.data.success) {
        // console.log(response.data);
        setName(response.data.user.name);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLoginSignup(false);
        // window.location.reload();
        // setData({
        //     name: "",
        //     email: "",
        //     password: ""
        // });
        toast.success(response.data.message);
      } else {
        // console.log(response.data.message, response.data.error);
        toast.error(response.data.message);
      }

    } catch (error) {
      if (currState === "Sign In"){
        toast.error('Server Error: Account not logged in!');
      }
      else {
        toast.error('Server Error: Account not created!');
      }
      // currState === "Login" ? console.log("Error creating account : ", error) : console.log("Error logging in: ", error)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev =>!prev);
  }
  
  const passwordChangeHandler = (event) => {
    event.preventDefault();
  }


  return (
    <div className='absolute z-10 w-full h-full -my-20 overflow-hidden bg-dark-coffee/80'>
       <div className='absolute top-44 left-[35%] py-8 px-10 animate-fade-in-quick bg-white border w-fit my-5 rounded-xl hover:shadow-xl'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='font-semibold text-3xl'>{currState}</h1>
          <img src={assets.close_icon} alt="cross" 
          className='cursor-pointer hover:opacity-50 duration-300'
          onClick={() => {
            setShowLoginSignup(false);
            setForgotPassword(false);
          }}
          />
        </div>

        {/* Sign In/Sign Up Form */}
        {
          forgotPassword? 
          (
          <form type="submit" className='flex flex-col items-start max-w-[20vw] text-base pb-4' onSubmit={passwordChangeHandler}>
            <p className="font-medium my-8">Enter your email and we'll send a reset link to help you reset your password.</p>
            <label htmlFor="email" className='mb-3 font-semibold text-gray-500'>Email</label>
            <input type="email" name="email" id="email" className='outline-none border-2 border-gray-500 rounded-md w-full py-1.5 px-4 font-semibold ' />
            <button type="submit" className='w-full bg-carrot/85 hover:bg-carrot text-white border mt-8 px-8 py-4 rounded-md text-xl outline-none font-semibold'>
                Send Reset Link
            </button>
          </form>) : (
            <form action="" className='flex flex-col items-start'
        onSubmit={onSubmitHandler}
        >
        {
            currState === "Sign In" ? <></> : <input type="text" placeholder="Name" className='border text-base my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
            name='name' onChange={onChangeHandler} value={data.name}
            />
        }
          <input type="email" placeholder="Email" className='border text-base my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
          name='email' onChange={onChangeHandler} value={data.email}
          />
          {/* <input type="password" placeholder="Password" className='border text-base relative my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
          name='password' onChange={onChangeHandler} value={data.password}
          /> */}

          <div className="relative w-full bg-blac my-4">
          <input
              type={isPasswordVisible ? "text" : "password"} placeholder="Password" className="border text-base py-2 px-4 w-full rounded-xl outline-none"
              name="password" value={data.password} onChange={onChangeHandler}
            />
            <img
              src={isPasswordVisible ? assets.eye_icon : assets.eye_close_icon} alt="toggle password visibility"
              className="absolute top-2.5 right-6 cursor-pointer" onClick={togglePasswordVisibility} width={20}
            />
          </div>
          {
              currState === "Sign In" && 
              <p className='mt-2 mb-4 ml-2 text-carrot cursor-pointer font-semibold hover:underline'
            onClick={() => setForgotPassword(true)}
            >Forgot Password?</p>
          }
            
          <p></p>

        {/* If confirm password is needed then use */}
          {/* {
            currState === "Sign Up"? <input type="password" placeholder="Confirm Password" className='border text-base'/> : <></>
          } */}

          {
            currState === "Sign Up" ? 
            <div className='flex gap-4 *:text-sm border-none my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'>
              <input type="checkbox" name="agreement" className='w-5 accent-carrot cursor-pointer' required/>
              <label htmlFor="agreement" className='*:text-carrot *:cursor-pointer'>I agree to Zaayka's <span>Terms of Service</span>, <span>Privacy Policy</span> and <span>Content Policies</span></label>
            </div> :
            <></>
          }
          
                   
          <button type="submit" className='w-full bg-carrot/85 hover:bg-carrot text-white font-semibold text-xl my-4 py-2 px-4 outline-none rounded-xl'>
            {
              currState === "Sign Up" ? "Create Account" : "Sign In"
            } 
          </button>
          {
            currState === "Sign Up" ?
             <p className='text-base'>Already have an account? <span className='text-carrot cursor-pointer font-semibold' onClick={() => setCurrState("Sign In")}>Login</span></p> : 
             <p className='text-base'>New to Zaayka? <span className='text-carrot cursor-pointer font-semibold' onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
          }
        </form>
          )
        }
        
      </div>
    </div>
   
  )
}

export default LoginSignup