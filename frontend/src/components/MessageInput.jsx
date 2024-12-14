import React from 'react'
import { useState,useRef } from 'react'
import { chatStore } from '../store/chat'
import { X, Image, Send } from 'lucide-react'
const MessageInput = () => {
    const [text,setText] = useState("")
    const [imagePrev,setImagePrev] = useState(null)
    const fileInputRef = useRef(null);
    const {sendMessage} = chatStore();
    const handleImageChange = (e) =>{
      const file = e.target.files[0];
      if(!file.type.startsWith("image/")){
        toast.error("Please select an image file")
        return
      }
      console.log(file)
      const reader = new FileReader();
      reader.onloadend=()=>{
        setImagePrev(reader.result)
      }
      reader.readAsDataURL(file)

    };
    const removeImage = () =>{
      setImagePrev(null)
      if (fileInputRef.current) fileInputRef.current.value="";
    };
    const handleSendMessage = async(e)=>{
      e.preventDefault();
      if ((!text.trim()) && !imagePrev) return;
      try{
        await sendMessage({
          text:text.trim(),
          image:imagePrev,
        });
        setText("");
        setImagePrev(null);
        if(fileInputRef.current) fileInputRef.current.value="";
      }catch(err){
        console.log("Failed to send the message:", err)
      }

    }
  return (
    <div className='p-4 w-full'>
      {imagePrev && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imagePrev} alt="Preview" className='size-20 object-cover rounded-lg border border-zice-700'/>
            <button onClick={removeImage}
            className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center' type='button'>

            </button>
            <X className="size-3"/>
          </div>
        </div>
      )

      }
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input type="text" 
          className='w-full input input-bordered rounded-lg input-sm sm:input-md'
          placeholder='Send a message....'
          value={text}
          onChange={(e)=>setText(e.target.value)}/>
          <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange}/>
          <button
            type='button'
            className={`hiddem sm:flex btn btn-circle ${imagePrev?"text-prev-500":"text-zinc-400"}`}
            onClick={()=>fileInputRef.current?.click()}
          >
            <Image size={20}/>
          </button>
        </div>
        <button type='submit'
        className='btn btn-sm btn-circle'
        disabled={!text.trim() && !imagePrev}>
          <Send size={20}/>
        </button>
        
      </form>
    </div>
  )
}

export default MessageInput