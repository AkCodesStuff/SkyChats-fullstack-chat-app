import React from 'react'
import { AuthBase } from '../store/Auth'
import {Link} from 'react-router-dom'
import {MessageSquare,Settings,User,LogOut} from 'lucide-react'
const Navbar = () => {
    const {logout,authUser} = AuthBase()
  return (
    <header className='bg-base-200 border-b-1 fixed w-full top-0 z-90'>
      <div className='container mx-auto px-4 h-16'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center'>
          <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
          <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
            <MessageSquare className='w-5 h-5 text-primary'/>
            
          </div>
          <h1 className='text-lg font-bold'>SkyChat</h1>
          </Link>
        </div>
        <div className='flex gap-4'>
        <Link to="/settings" className='flex items-center gap-2 hover:-translate-y-1 hover:opacity-80 transition-all cursor-pointer'>
          <Settings className='size-4'/>
          <span className='hidden sm:inline'>Settings</span>
        </Link>
        {authUser && (
        <>
        <Link to={"/profile"} className='flex gap-2 hover:-translate-y-1 hover:opacity-80 transition-all cursor-pointer'>
          <User className="size-5"/>
          <span className='hidden sm:inline'>Profile</span>
        </Link>

        <button className='flex gap-2 items-center hover:-translate-y-1 hover:opacity-80 transition-all cursor-pointer' onClick={logout}>
          <LogOut className="size-5"/>
          <span className='hidden sm:inline'>Logout</span>
        </button>
        </>
      )}
</div>
      </div>
      </div>
    </header>
  )
}

export default Navbar