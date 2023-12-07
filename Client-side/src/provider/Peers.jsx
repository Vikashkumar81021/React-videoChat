import React, { createContext, useMemo, useContext } from "react";

const PeerContext = createContext(null);

export const usePeer = () => {
  return useContext(PeerContext);
};

export const PeerProvider = (props) => {
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.l.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const createoffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };
 
  const createAnswer=async (offer)=>{
    await peer.setRemoteDescription(offer)
    const answer=await peer.createAnswer()
    await peer.setLocalDescription(answer)
    return answer
  }

  const setRemoteAns= async(ans)=>{
 await peer.setRemoteDescription(ans)
  }
  const sendStream=async(stream)=>{
  const tracks=stream.getTracks()
  for(const track of tracks)
  peer.addTrack(track,stream)
  }

  return (
    <PeerContext.Provider value={{ peer, createoffer,createAnswer,setRemoteAns,sendStream }}>
      {props.children}
    </PeerContext.Provider>
  );
};
