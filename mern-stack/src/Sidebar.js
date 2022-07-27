import React from 'react'
import "./Sidebar.css" 
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar,IconButton }  from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className="sidebar">
        <div className='sidebar__header'>
            <Avatar src="https://otakukart.com/wp-content/uploads/2022/04/JJK-Sukuna-1920x1080.jpg"/>
            <div className='sidebar__headerRight'>
                <IconButton>
                <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                <ChatIcon/>
                </IconButton>
                <IconButton>
                <MoreHorizIcon/>
                </IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchIcon/>
                <input placeholder='Search or start new chat' type='text' />
            </div>
        </div>
        <div className='sidebar__chats'>
            <SidebarChat />
            <SidebarChat />
            <SidebarChat /> 
            
        </div>
    </div>
  )
}

export default Sidebar