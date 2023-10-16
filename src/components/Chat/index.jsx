import { useEffect, useState } from "react"
import "./Chat.css"

import { useParams } from "react-router-dom"

import db from "../../config/firebase"
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore"

import { Avatar, IconButton } from "@mui/material"
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@mui/icons-material"
import { useStateValue } from "../../config/StateProvider"

const Chat = () => {
  const [input, setInput] = useState("")
  const { roomId } = useParams()
  const [roomInfo, setRoomInfo] = useState("")
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()

  console.log("test", roomInfo)

  useEffect(() => {
    if (roomId) {
      const roomRef = collection(db, 'rooms');
      const unsubscribe = onSnapshot(doc(roomRef, roomId), (snapshot) => {
        setRoomInfo(snapshot.data())
        
       const messagesRef = collection(db, 'rooms', roomId, 'messages');
        const unsubscribe2 = onSnapshot(messagesRef, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.timestamp - b.timestamp))
        })
      })
    }
  }, [roomId])

  console.log(messages)

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log("You typed >>>", input)

    const roomRef = collection(db, 'rooms', roomId, 'messages');
    const unsubscribe = addDoc(roomRef, {
      message: input,
      name: user?.displayName,
      timestamp: new Date(),  
    })
    setInput("")
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={roomInfo?.profileImage} />

        <div className="chat__headerInfo">
          <h3>{roomInfo?.name}</h3>
          <p>{messages[messages.length - 1] ? new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() : null}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body" style={{ backgroundImage: `url(${roomInfo?.backgroundImage})` }}>
        {messages.map((message) => (
          <p key={message.id} className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>


      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input type="text" value={input} placeholder="Type a message" onChange={(e) => setInput(e.target.value)} />
          <button type="submit" onClick={handleSendMessage}>Send Message</button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat