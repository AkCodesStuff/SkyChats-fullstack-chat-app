import React, { useState } from 'react'
import { AuthBase } from '../store/Auth';
import { MessageSquare,Eye,EyeOff, Loader2 } from 'lucide-react';
import AuthImage from '../components/AuthImage';
import {Link} from 'react-router-dom'

const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    fullName:"",
    email:"",
    password:""
  });
  const [validateError,setValidateError] = useState(null)
  const signup = AuthBase((state)=>state.signup);
  const isSigningUp = AuthBase((state)=>state.isSigningUp)
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!data.fullName.trim()) {
      setValidateError("Full name is required");
      setTimeout(()=>{
        setValidateError(null)
      },2000) 
      return}
    if(!data.email.trim()) {
      setValidateError("Enter a valid email");
      setTimeout(()=>{
        setValidateError(null)
      },2000) 
      return}
    if(!data.password || data.password.length<6) {
      setValidateError("Enter a good password");
      setTimeout(()=>{
        setValidateError(null)
      },2000) 
      return}
    console.log(data)
    signup(data)
  }
  
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
       <div className='w-full max-w-md space-y-8'>
          <div className='flex gap-2 items-center'>
            <MessageSquare className='size-6 text-purple-300'/>
            <div>Sign Up Now to start chatting</div>
          </div>
          <div className='text-4xl'>Create an Account</div>
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
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Username" value={data.fullName} onChange={(e)=>setData({...data,fullName:e.target.value})}/>
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
<button type="submit" className="btn glass mt-4 w-full" disabled={isSigningUp}>
  {isSigningUp? (
    <>
    <Loader2 className='size-5 animate-spin'/>
    Signing up.....
    </>
  ):
  (
    "Create Account"
  )}
</button>
          </form>
          <div className='text-center'>
          Already have an account?{" "}
          <Link to="/login" className="link link-primary ">
          Sign in
          </Link>
          </div>
        </div> 
    </div>

  <AuthImage 
  title="Sign up to chat"
  subtitle="Connect with your friends"/>
  
    </div>
  )
}

export default Singup