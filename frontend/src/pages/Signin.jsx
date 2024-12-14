import React, { useState } from 'react'
import { AuthBase } from '../store/Auth';
import { MessageSquare,Eye,EyeOff, Loader2 } from 'lucide-react';
import AuthImage from '../components/AuthImage';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    email:"",
    password:""
  });
  const [validateError,setValidateError] = useState(null)
  const signin = AuthBase((state)=>state.signin);
  const isLoggingIn = AuthBase((state)=>state.isLoggingIn)
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!data.email.trim()) {
      setValidateError("Enter a valid email");
      toast.error("Enter a valid email")
      setTimeout(()=>{
        setValidateError(null)
      },2000) 
      return}
    if(!data.password || data.password.length<6) {
      setValidateError("Enter the correct password");
      setTimeout(()=>{
        setValidateError(null)
      },2000) 
      return}
    console.log(data)
    signin(data)
  }
  
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
       <div className='w-full max-w-md space-y-8'>
          <div className='flex gap-2 items-center'>
            <MessageSquare className='size-6 text-purple-300'/>
            <div>Login with your email address and password</div>
          </div>
          <div className='text-4xl'>Login with your account</div>
        <form onSubmit={handleSubmit}>
  
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type={showPassword?"text":"password"} className="grow" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
  <button onClick={(e)=>{
    setShowPassword(!showPassword)
    e.preventDefault()}}>{showPassword?<EyeOff/>:<Eye/>}</button>
</label>
<button type="submit" className="btn glass mt-4 w-full" disabled={isLoggingIn}>
  {isLoggingIn? (
    <>
    <Loader2 className='size-5 animate-spin'/>
    Logging in.....
    </>
  ):
  (
    "Log In"
  )}
</button>
          </form>
          <div className='text-center'>
          New to SkyChat?{" "}
          <Link to="/signup" className="link link-primary ">
          Create an Account
          </Link>
          </div>
        </div> 
    </div>

  <AuthImage 
  title="Login Now to Start Chatting"
  subtitle="Connect with your friends"/>

    </div>
  )
}

export default Signin