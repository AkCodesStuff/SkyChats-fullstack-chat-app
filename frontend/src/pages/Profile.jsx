import React from 'react'
import { AuthBase } from '../store/Auth';
import {Camera,User,Mail} from 'lucide-react'
import { useState } from 'react';
const Profile = () => {
    const {authUser,isUpdating,updateProfile} = AuthBase()
    const [selectedImg,setSelectedImg] = useState(null)
    const handleUpload = async(e)=>{
      const file = e.target.files[0];
      if(!file) return
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = async () =>{
        const base64Format = reader.result;
        setSelectedImg(base64Format)
        await updateProfile({profilePic:base64Format})
      }
    }
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-purple-7-- rounded-xl p-6 space-y-8'>
          <div className='text-center'>
              <h1 className='text-2xl font-semibold'>Profile</h1>
              <p className='mt-2'>Your Profile</p>
        </div>


      <div className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <img src={selectedImg || authUser.profilePic||"/avatar.png"} alt="profile"
          className='size-32 rounded-full object-cover border-4'/>
          <label htmlFor="pic-upload"
          className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdating?"animate-pulse pointer-events-none":""}`}>
           <Camera className="screen-5 text-base-200"/>
           <input type="file" id="pic-upload" className='hidden' accept="image/*" onChange={handleUpload} disabled={isUpdating}/> 
          </label>
        </div>
        <p className='text-sm text-zinc-400'>
          {isUpdating? "Uploading...":"Clink the Camera Icon to upload a picture"}
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-1.5'>
          <div className='text-sm text-zinc-400 flex items-center gap-2'>
            <User className="size-4"/>
            Full Name
          </div>
          <p className='px-4 py-2.5 bg-purple-100 text-slate-700 rounded-lg border'>{authUser?.fullName}</p>
          </div>
          <div className='space-y-1.5'>
            <div className='text-sm text-ziinc-400 flex items-center gap-2'>
              <Mail className="size-4"/>
              Email Address
            </div>
            <p className='px-4 py-2.5 bg-purple-100 text-slate-700 rounded-lg border'>{authUser?.email}</p>
          </div>
          </div>   
        <div className='mt-6 bg-base-300 rounded-xl p-6'>
          <h2 className='text-lg font-medium mb-4'>Account Information</h2>
          <div className='spacy-y-3 text-sm'>
            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
              <span>Member Since</span>
              <span>{authUser.createdAt?.split(":")[0]}</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <span>Account Status</span>
              <span className='text-green-500'>Acitve</span>
            </div>
          </div>
          </div>          

        </div>
      </div>
    </div>
  )
}

export default Profile