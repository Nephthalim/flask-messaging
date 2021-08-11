import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ChatRoom.css'
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
const ChatRoom = ({ socket, setChatId, contact }) => {
    const token = localStorage.getItem("x-token");
    const { chatId } = useParams();
    const textInputRef = useRef();
    const url = "http://nephthalims-chat.herokuapp.com"
    // const url = "http://127.0.0.1:5000"
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);


    const sendMessage = (e) => {
        e.preventDefault();
        const enteredTextInput = textInputRef.current.value;
        console.log(enteredTextInput)
        socket.emit('message', { msg: enteredTextInput, conversation_id: chatId });
        textInputRef.current.value = "";
    }


    socket.on('message', data => {
        setMessages(messages => [...messages, data])

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
                return res.json()
            }).then((data) => {
                setMessages(data.messages)
                setUser(data.user)
            }).catch((err) => {
                localStorage.removeItem('x-token')
            })
    }

    useEffect(() => {
        getMessages();
        socket.connect();
        socket.emit('join', { conversation_id: chatId })
        setChatId(chatId)

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
