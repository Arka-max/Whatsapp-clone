import { Avatar,IconButton }  from '@mui/material';
import React, { useState } from 'react'
import "./Chat.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import AttachmentIcon from '@mui/icons-material/Attachment';
import axios from './axios';


function Chat({messages}) {

  const [input,setInput]=useState("");

    const sendMessage = async(e) =>
    {
        e.preventDefault();

       await axios.post('/messages/new',
        {
            message:input,
            name:"Arka Mazumdar",
            timestamp:"Just Now",
            received: true,
        })

        setInput("");
    }

  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar/>
            <div className='chat__headerInfo'>
                <h3>Room name</h3>
                <p>Last seen</p>
            </div>
        
            <div className='chat_headerRight'>
                <IconButton>
                <SearchIcon/>
                </IconButton>
                <IconButton>
                <AttachFileIcon/>
                </IconButton>
                <IconButton>
                <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className='chat__body'>
            {messages.map((message)=> (

            <p className={`chat__message ${message.received && 'chat__reciever'}`}>
            <span className='chat__name'>{message.name}</span>
                {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>

            </p>

            ))}

        </div>
        <div className='chat__footer'>
            <InsertEmoticonIcon/>
            <AttachmentIcon/>
            <form>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a message' type='text'/>
                <button onClick={sendMessage} type="submit" > Send a Message</button>
            </form>
            <MicIcon/>
        </div>
    </div>
  )
}

export default Chat