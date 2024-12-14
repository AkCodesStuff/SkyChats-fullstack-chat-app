import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Buffer } from 'buffer'
import Homepage from './pages/Homepage'
import Signin from './pages/Signin'
import Singup from './pages/Singup'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { AuthBase } from './store/Auth'
import {Loader} from 'lucide-react'
import { themeStore } from './store/Theme'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {authUser,authCheck,isAuthing,online} = AuthBase()
  const {theme} = themeStore()
  console.log(online)
  useEffect(()=>{
    authCheck()
  },[authCheck]);
  
  if(isAuthing && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-20 animate-spin'/>
  </div>
  )
  return (
    <div data-theme={theme}>
      
      
      <Navbar />
      <Routes>
      <Route path='/' element={authUser?<Homepage/>:<Navigate to="/login"/>}/>
      <Route path='/signup' element={!authUser?<Singup/>:<Navigate to="/"/>}/>
      <Route path='/login' element={!authUser?<Signin/>:<Navigate to="/"/>}/>
      <Route path='/settings' element={authUser?<Settings/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={authUser?<Profile/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
  </div>
  )
}

export default App