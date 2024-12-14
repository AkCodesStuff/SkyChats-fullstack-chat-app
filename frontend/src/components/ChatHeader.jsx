import React from 'react'
import { AuthBase } from '../store/Auth'
import { chatStore } from '../store/chat'
import {X} from 'lucide-react'
const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = chatStore();
  const {online} = AuthBase()
  return (
    <div className='p-2.5 border-b border-base-300'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='size-10 rounded-full relative'>
              <img src={selectedUser.profilePic||"/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>
          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-sm text-base-content/70'>
            {online.includes(selectedUser._id)?"Online":"Offline"}
            </p>
            </div>
        </div>
        <button onClick={()=>setSelectedUser(null)}>
          <X/>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader