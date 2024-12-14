import {create} from "zustand"
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";
import {io} from 'socket.io-client';
const BASE = import.meta.env.MODE === "development" ? "http://localhost:3050/api":"/"
export const AuthBase = create((set,get)=>({
    authUser:null,
    isAuthing: true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdating:false,
    socket:null,
    online:[],
    authCheck: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            get().connectSocket()
        }catch(err){
            set({authUser:null})
            console.log("error in Auth frontend authcheck" + err)
        }finally{
            set({isAuthing:false})
        }
    },
    signup: async(updata) => {
        set({isSigningUp:true});
        try{
            const res = await axiosInstance.post('/auth/signup',updata)
            set({authUser:res.data})
            console.log("Account created successfully")
        }catch(err){
            console.log("Error while signing up" + err)
            toast.error(err)
        }finally{
            set({isSigningUp:false})
        }
    },
    logout: async() =>{
        try{
            await axiosInstance.post('/auth/logout')
            set({authUser:null})
            console.log("Logger out succesfully")
            get().diconnectSocket();
        }catch(err){
            console.log("Cannot logout")
        }
    },
    signin: async(indata)=>{
        console.log(indata)
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post('/auth/login',indata)
            set({authUser:res.data})
            console.log("Loggen in succesfully")
            
            get().connectSocket();

        }catch(err){
            console.log("There was some error while logging in" + err)
            toast.error(err)
            
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile: async(updata)=>{
        set({isUpdating:true})
        try{
            const res = await axiosInstance.put("/auth/update",updata)
            set({authUser:res.data});

        }catch(err){
            console.log("Error while updating the profile"+err)
        }finally{
            set({isUpdating:false})
        }
    },
    connectSocket: ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket});
        socket.on("onlineUsers",(users)=>{
            set({online:users})
        })
    },
    diconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}))