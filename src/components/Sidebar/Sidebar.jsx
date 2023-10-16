import { useState, useEffect } from "react"
import "./Sidebar.css"

import db from "../../config/firebase"
import { collection, onSnapshot } from 'firebase/firestore';

import { useStateValue } from "../../config/StateProvider";

import { Avatar, IconButton } from "@mui/material"
import { ChatBubbleTwoTone, DonutLarge, MoreVert, SearchOutlined } from "@mui/icons-material"

import SidebarChatList from "../SidebarChatList"

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
      const roomsRef = collection(db, 'rooms');
      const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
        setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        })))
      })

      return () => {
        unsubscribe()
      }

  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatBubbleTwoTone />
          </IconButton>  
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChatList addNewChat />
        {rooms.map((room)=> 
          <SidebarChatList key={room.id} id={room.id} name={room.data.name} profileImage={room.data.profileImage}/>
        )}
      </div>
    </div>
  )
}

export default Sidebar