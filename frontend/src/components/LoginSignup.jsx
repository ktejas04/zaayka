import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const LoginSignup = ({setShowLoginSignup}) => {

  const [currState, setCurrState] = useState("Sign In")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {url, token, setToken, setName} = useContext(Context);
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
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // console.log(formData);
    // console.log("Form Data:", Array.from(formData.entries())); // Logging formData to check contents

    try {
      const response = await axios.post(`${url}/api/v1/user/${action}`, data);
      if (response.data.success) {
        // console.log(response.data);
        setToken(response.data.token);
        setName(response.data.user.name);
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

  return (
    <div className='absolute z-10 w-full h-full -my-20 overflow-hidden bg-dark-coffee/80'>
       <div className='absolute top-44 left-[35%] py-8 px-10 animate-fade-in-quick bg-white border w-fit my-5 rounded-xl hover:shadow-xl'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='font-semibold text-3xl'>{currState}</h1>
          <img src={assets.close_icon} alt="cross" 
          className='cursor-pointer hover:opacity-50 duration-300'
          onClick={() => setShowLoginSignup(false)}
          />
        </div>
        <form action="" className='flex flex-col items-start'
        onSubmit={onSubmitHandler}
        >
        {
            currState === "Sign In" ? <></> : <input type="text" placeholder="Name" className='border text-base my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
            name='name' onChange={onChangeHandler} value={data.name}
            />
        }
          <input type="email" placeholder="Email" className='border text-base  my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
          name='email' onChange={onChangeHandler} value={data.email}
          />
          <input type="password" placeholder="Password" className='border text-base  my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'
          name='password' onChange={onChangeHandler} value={data.password}
          />
          {
            currState === "Sign In" && <p className=' mb-12 ml-2 text-carrot hover:underline cursor-pointer font-semibold'>Forgot Password?</p>
          }

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
          
                   
          <button type="submit" className='w-full bg-carrot/85 hover:bg-carrot text-white font-semibold text-xl py-2 rounded-xl'>
            {
              currState === "Sign Up" ? "Create Account" : "Sign In"
            } 
          </button>
          {
            currState === "Sign Up" ?
             <p className='text-base  my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'>Already have an account? <span className='text-carrot/85 hover:text-carrot hover:font-bold cursor-pointer font-semibold' onClick={() => setCurrState("Sign In")}>Login</span></p> : 
             <p className='text-base  my-4 py-2 px-4 outline-none rounded-xl w-[20vw]'>New to Zaayka? <span className='text-carrot/85 hover:text-carrot hover:font-bold cursor-pointer font-semibold' onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
          }
        </form>
      </div>
    </div>
   
  )
}

export default LoginSignup