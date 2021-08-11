import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar/SideBar'
import {
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom'
import ChatRoom from '../components/Chat/ChatRoom';
import texting_image from './undraw_Online_chat_re_c4lx.svg'
import './Chat.css'
import { io } from "socket.io-client";
const Chat = ({ isAuthenticated, setAuthentication }) => {
    const token = localStorage.getItem('x-token')
    const url = "http://nephthalims-chat.herokuapp.com"
    // const url = "http://127.0.0.1:5000"
    const socket = io( { path: '/socket.io/', extraHeaders: { 'x-token': token, 'Content-Type': 'application/json' } });
    const [chatId, setChatId] = useState();
    const [contact, setContact] = useState();
    const match = useRouteMatch();


    useEffect(() => {
        if (token && token !== "" && token !== undefined) {
            setAuthentication(true);
        }

    }, [])
    return (
        <div className='chat'>
            <SideBar setContact={setContact} chatId={chatId} isAuthenticated={isAuthenticated} setAuthentication={setAuthentication}/>
            <Switch>
                <Route exact path={match.path}>
                    <div className='image'>
                        <img src={texting_image} />
                    </div>
                </Route>
                <Route exact path={`${match.path}/:chatId`}>
                    <ChatRoom socket={socket} setChatId={setChatId} contact={contact}/>
                </Route>
            </Switch>

        </div>
    )
}

export default Chat
