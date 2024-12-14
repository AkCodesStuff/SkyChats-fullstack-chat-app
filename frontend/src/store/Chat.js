import {create} from 'zustand';
import {toast} from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js';
import {AuthBase} from './Auth.js'
export const chatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessageLoading:false,
    online:[],
    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get("/message/users");
            set({users:res.data})
            
        }catch(err){
            console.log(err)
        }finally{
            set({isUsersLoading:false})
            
            
        }
    },

    
    getMessages:async(userId)=>{
        set({isMessageLoading:true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data});
        }catch(err){(err.response.data.message)
            toast.error
        }finally{
            set({isMessageLoading:false})
        }
    },
    sendMessage: async(messData) =>{
        const {selectedUser,messages} = get()
        try{
           const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messData) 
           set({messages:[...messages,res.data]})
        }catch(err){
            console.log(err.response.data.message)
        }
    },

    updateMessages:function(){
        const {selectedUser} = get();
        if(!selectedUser) return;
        const socket = AuthBase.getState().socket;
        socket.on("Message",(mes)=>{
            if(mes.senderId !== selectedUser._id) return;
            set(
                {
                    messages: [...get().messages,mes],
                }
            )
        })
    },

    clearMessages:function(){
        const socket = AuthBase.getState().socket;
        socket.off("Message")
    },

    setSelectedUser:(selectedUser)=>set({selectedUser}),
}))