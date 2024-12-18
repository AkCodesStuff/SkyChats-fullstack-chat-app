import {Server} from 'socket.io';
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin:["http://localhost:5173"]
    }
})

const onlineUsers = {

}

export const getRecSocId = (userId) => {
    return onlineUsers[userId]
}

io.on("connection",(socket)=>{
    console.log("User connected",socket.id);
    const userId = socket.handshake.query.userId;
    if(userId) onlineUsers[userId] = socket.id;
    io.emit("onlineUsers",Object.keys(onlineUsers));
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        delete onlineUsers[userId];
        io.emit("onlineUsers",Object.keys(onlineUsers));
    })

})

export {io,app,server}