import { useState, useEffect } from "react"
import "./SidebarChatList.css"

import { Link } from "react-router-dom"

import { Avatar } from "@mui/material"
import { collection, addDoc, onSnapshot, doc } from 'firebase/firestore';
import db from "../../config/firebase";

const SidebarChatList = ({ id, name, profileImage, addNewChat }) => {
  const [seed, setSeed] = useState("")
  const [messages, setMessages] = useState("")

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, 'rooms', id, 'messages');
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.timestamp - b.timestamp))
      })
    }
  }, [id])


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      const roomRef = collection(db, 'rooms');
        addDoc(roomRef, {
          name: roomName
        })      
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChatList">
      <Avatar src={profileImage} />
      <div className="sidebarChatList__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebarChatList" onClick={createChat}>
      <h2>Add new Room</h2>
    </div>
  )
}

export default SidebarChatList