import React, { useEffect, useState } from "react";
import { useSocket } from "../provider/Socket";
import ReactPlayer from 'react-player';
import { usePeer } from "../provider/Peers";

function RoomPage() {
  const { peer, createoffer, createAnswer, setRemoteAns, sendStream } = usePeer();
  const [stream, setMyStream] = useState(null);
  const { socket } = useSocket();

  const handleNewUserJoined = async (data) => {
    const { emailId } = data;
    console.log("new user joined", emailId);
    const offer = await createoffer();
    socket.emit("call-user", { emailId, offer });
  };

  const handleIncomingCall = async (data) => {
    const { from, offer } = data;
    console.log("incoming call from", from, offer);
    const ans = await createAnswer(offer);
    socket.emit('call-accepted', { from, ans });
  };

  const handleCallAccepted = async (data) => {
    const { ans } = data;
    console.log('call got accepted', ans);
    await setRemoteAns(ans);
  };

  const getUserMediaStream = async () => {
    const userStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    sendStream(userStream);
    setMyStream(userStream);
  };

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off('call-accepted', handleCallAccepted);
    };
  }, [socket, createoffer]);

  useEffect(() => {
    getUserMediaStream();
  }, []); 

  return (
    <div>
      Room RoomPage
      {stream && <ReactPlayer url={URL.createObjectURL(stream)} playing muted />}
    </div>
  );
}

export default RoomPage;
