const express=require('express')
const bodyparser=require('body-parser')
const { Server } = require('socket.io')
const io=new Server({
    cors:true
});
const app=express();

app.use(bodyparser.json())

const emailTosocketMaping=new Map()
const socketToEmailMaping=new Map()
io.on('connection',(socket)=>{
    console.log("new connection");
    socket.on('join-room',(data)=>{
        const {roomId,emailId}=data
        console.log("user",emailId,"joined",roomId);
        emailTosocketMaping.set(emailId,socket.id)
        socketToEmailMaping.set(socket.id,emailId)
        socket.join(roomId)
        socket.emit('joined-room',{roomId})
        socket.broadcast.to(roomId).emit("user-joined",{emailId})
    })
    socket.on('call-user',(data)=>{
        const {emailId,offer}=data
        const fromEmail=socketToEmailMaping.get(socket.id)
        const socketId=emailTosocketMaping.get(emailId)
        socket.to(socketId).emit('incoming-call',{from:fromEmail,offer})
    });
    socket.on('call-accepted',data =>{
        const {emailId,ans}=data
        const socketId=emailTosocketMaping.get(emailId)
        socket.to(socketId).emit('call-accepted',{ans})

    })
})

app.listen(8000,()=>console.log('server is listen 8000'));

io.listen(8080)