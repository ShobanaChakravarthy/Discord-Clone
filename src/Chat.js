import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import ChatHeader from './ChatHeader'
import Message from './Message'
import {selectUser} from "./features/userSlice";
import {selectChannelId,selectChannelName} from "./features/appSlice"
import { useSelector } from 'react-redux'
import db from "./firebase"
import firebase from "firebase"

function Chat() {
    const user = useSelector(selectUser)
    const channelId =useSelector(selectChannelId)
    const channelName =useSelector(selectChannelName)
    const[inp,setInp]=useState("")
    const[msgs,setMsgs]=useState([])

    useEffect(()=>{
        if(channelId){
            db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                setMsgs(snapshot.docs.map((doc) => doc.data()))
            );
        }
    },[channelId])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:inp,
                user:user
            })
        setInp("");
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
                {msgs.map((msg)=>(
                    <Message
                    timestamp={msg.timestamp}
                    message={msg.message}
                    user={msg.user}
                    />
                ))}
            </div>
            <div className="chat__input">
                <AddCircle fontSize="large"/>
                <form>
                    <input 
                        placeholder={`Message #${channelName}`} 
                        disabled={!channelId}
                        value={inp} onChange={(e)=>setInp(e.target.value)} 
                        type="text"
                    />
                    <button 
                        disabled={!channelId} 
                        type="submit" 
                        className="chat__button"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcard fontSize="large"/>
                    <Gif fontSize="large"/>
                    <EmojiEmotions fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
