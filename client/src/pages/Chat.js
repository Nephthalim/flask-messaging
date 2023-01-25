import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar/SideBar'
import {
    Routes,
    Route,
    useMatch,
    Navigate
} from 'react-router-dom'
import ChatRoom from '../components/Chat/ChatRoom';
import texting_image from './undraw_Online_chat_re_c4lx.svg'
import './Chat.css'
import { io } from "socket.io-client";
const Chat = ({ isAuthenticated, setAuthentication }) => {
    const token = localStorage.getItem('x-token')
    // const socket = io({ path: '/socket.io/', extraHeaders: { 'x-token': token, 'Content-Type': 'application/json' } });
    const [chatId, setChatId] = useState();
    const [contact, setContact] = useState();
    useEffect(() => {
        if (token && token !== "" && token !== undefined) {
            setAuthentication(true);
            console.log(token)
        }
    }, [])
    return (
        <>
            {token ?
                <div className='chat'>
                <h1>Hello</h1>
                    <SideBar setContact={setContact} chatId={chatId} isAuthenticated={isAuthenticated} setAuthentication={setAuthentication} />
                    {/* <Routes>
                        <Route path=":chatId" children={({ match }) => (
                            match ?
                            (
                                <ChatRoom socket={socket} setChatId={setChatId} contact={contact} setContact={setContact} />
                            ) : (
                                <div className='image'>
                                    <img src={texting_image} />
                                </div>)
                        )}
                        />
                    </Routes> */}
                </div>
                : <Navigate to="/" />
            }
        </>
    )
}

export default Chat
