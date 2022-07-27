import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const[messages,setMessages]=useState([]); // to store the data 

  //to fetch the data from the backend
  useEffect(()=>
  {
    axios.get("/messages/sync").then((response)=>{
      setMessages(response.data);

    })
  },[])

  //configuring the pusher effect
  useEffect(() => {
    const pusher = new Pusher('674d911d16b306833ef3', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',  (newMessage)=> {
      setMessages([...messages, newMessage])
    });

    return () =>
    {
      channel.unbind_all();
      channel.unsubscribe();
    } 

  },[messages])

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
      <Sidebar/>
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
