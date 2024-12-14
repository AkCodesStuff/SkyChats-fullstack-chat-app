import React, { useRef } from 'react'
import { chatStore } from '../store/chat'
import { useEffect } from 'react';
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput';
import MessageSkel from './skeletons/MessageSkel';
import { AuthBase } from '../store/Auth';
import { formatTime } from '../lib/utils';
const Chat = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser,updateMessages,clearMessages} = chatStore();
  const {authUser} = AuthBase();
  const toBottomRef = useRef(null)
  useEffect(()=>{
    getMessages(selectedUser._id)
    updateMessages();
    return() => clearMessages();
  },[selectedUser._id,getMessages,updateMessages,clearMessages])

  useEffect(()=>{
    if(toBottomRef.current && messages){
      toBottomRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages])
  if(isMessagesLoading) return(
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkel/>
      <MessageInput/>
    </div>
  ) 
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'
      >
        {messages.map((message)=>(
          <div key={message._id}
          ref={toBottomRef}
          className={`chat ${message.senderId === authUser._id?"chat-end":"chat-start"}`}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser._id?authUser.profilePic ||"/avatar.png":selectedUser.profilePic||"/avatar.png"} alt="picpro" />
              </div>
            </div>
            <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>{formatTime(message.createdAt)}</time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image&&(
                <img src={message.image} alt="Attachment Loading..."  className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput/>
    </div>
  )
}

export default Chat