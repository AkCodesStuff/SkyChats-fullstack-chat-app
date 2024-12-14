import User from "../models/user.js";
import Message from "../models/message.js";
import cloud from "../lib/cloudinary.js";
import { getRecSocId,io } from "../lib/socket.js";

export const getUsers = async(req,res) =>{
    try {
       const loggedInUserId = req.user._id;
       const filtered = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
       res.status(200).json(filtered)
       } 
     catch (error) {
        console.log("Error getUsers"+error);
        res.status(500).json({message:"Server Side error"});
    }
}
 
export const getMessages = async(req,res) =>{
    try {
        const {id:userOnChat} = req.params
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:userOnChat},
                {senderId:userOnChat,receiverId:senderId}
            ]
        })
        console.log(messages)
        res.status(200).json(messages)
    }
    catch(err){
        console.log("Error getMessages"+err)
        res.status(500).json({message:"Internal server error"})
    }
}
export const sendMessage = async(req,res) =>{
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const uploadImage = await cloud.uploader.upload(image)
            imageUrl = uploadImage.secure_url;
        }
        
        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
    })
    await newMessage.save()

    const recSocId = getRecSocId(receiverId);
    if(recSocId){
        io.to(recSocId).emit("Message",newMessage)
    }

    res.status(201).json(newMessage)
    }catch(err){
        console.log("Error sendMessage control"+err)
        res.status(500).json({err:"Server side error"});
    }
}