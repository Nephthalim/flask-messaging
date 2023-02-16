import React, { useEffect, useRef, useState } from 'react'
import { useParams, } from 'react-router-dom'
import './ChatRoom.css'
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import { io } from "socket.io-client";

const ChatRoom = ({ setChatId, chosen, setChosen }) => {

    const token = localStorage.getItem("x-token");
    const socket = io("https://nephthalim-flask-messaging-app.onrender.com:10000", { extraHeaders: { 'x-token': token, 'Accept': 'application/json' } });
    const { chatId } = useParams();
    const textInputRef = useRef();
    const [messages, setMessages] = useState([]);
    const [contact, setContact] = useState();
    const [user, setUser] = useState([]);
    const sendMessage = (e) => {
        e.preventDefault();
        const enteredTextInput = textInputRef.current.value;
        socket.emit('message', { msg: enteredTextInput, conversation_id: chatId });
        textInputRef.current.value = "";
    }
    socket.on("message", data => {
        setMessages(messages => [...messages, data])

    });
    socket.on("connect", () => {
        console.log("Connected")
    });

    const getMessages = () => {
        fetch(
            '/chat/messages/' + chatId,
            {
                method: "GET",
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "x-token": token
                }
            }).then((res) => {
                if (res.status === 200 || res.status === 201) return res.json()
            }).then((data) => {
                setContact(data.recipient)
                setMessages(data.messages)
                setUser(data.user)
            }).catch((err) => {
                console.log(err)

            })
    }

    useEffect(() => {
        socket.connect()
        socket.emit("join", { conversation_id: chatId })
    }, [])

    useEffect(() => {
        setChatId(chatId)
        getMessages();
    }, [chatId])

    return (
        <div className='hero'>
            <ScrollToBottom className="messages">
                {messages.map((message) => {

                    return <Message
                        key={message.id}
                        name={contact}
                        message={message.msg}
                        time_sent={message.time_sent}
                        my_message={message.sender === user}
                    />

                }
                )}
            </ScrollToBottom>
            <form onSubmit={sendMessage}>
                <input className="msg_input" id="msg" type="text" ref={textInputRef} placeholder="Text message" autoComplete="off" />
            </form>
        </div>
    )

}

export default ChatRoom
