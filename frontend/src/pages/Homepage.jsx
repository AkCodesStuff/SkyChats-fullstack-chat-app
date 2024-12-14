import React from 'react'
import { chatStore } from '../store/chat'
import Sidebar from '../components/Sidebar';
import NoChat from '../components/NoChat';
import Chat from '../components/Chat'
const Homepage = () => {
  const {selectedUser} = chatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded overflow-hidden'>
            <Sidebar/>
            {!selectedUser?<NoChat/>:<Chat/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage