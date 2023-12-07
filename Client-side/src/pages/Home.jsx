import React, { useEffect, useState } from 'react'
import {useSocket} from  '../provider/Socket'
import { useNavigate } from 'react-router-dom';
function Home() {
  const {socket}=useSocket();
 const [email,setEmail]=useState("")
 const [roomId,setroomId]=useState("")
 const navigate=useNavigate();
 const handlejoined=({roomId})=>{
  navigate(`/room/${roomId}`);
 }
 useEffect(()=>{
  socket.on('joined-room',handlejoined)
  socket.off('joined-room',handlejoined)
 },[socket])
 const handleroom=()=>{
 socket.emit("join-room",{emailId:email,roomId})
 }
  return (
    <div className='homepage-container'>
     <div className='input-container'>
        <input type="email" placeholder='Enter your Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="text" placeholder='Enter your room code' value={roomId} onChange={e=>setroomId(e.target.value)}/>
        <button onClick={handleroom}>Enter Room</button>
     </div>
    </div>
  )
}

export default Home
