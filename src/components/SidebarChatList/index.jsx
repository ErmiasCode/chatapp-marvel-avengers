import { useState, useEffect } from "react"
import "./SidebarChatList.css"

import { Link } from "react-router-dom"

import db from "../../config/firebase";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

import { Avatar } from "@mui/material"

const SidebarChatList = ({ id, name, profileImage, addNewChat }) => {
  const [messages, setMessages] = useState("")

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, 'rooms', id, 'messages');
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.timestamp - b.timestamp))
      })
    }
  }, [id])

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