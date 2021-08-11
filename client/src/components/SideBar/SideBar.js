import React, { useEffect, useRef } from 'react'

import { useState } from 'react'
import { useHistory, Link, useRouteMatch } from 'react-router-dom'
import { toaster } from '../../App';
import Conversation from './Conversation'
import './SideBar.css';
import { BiLogOut } from "react-icons/bi";

const Contacts = ({ setContact, chatId, isAuthenticated, setAuthentication }) => {
    const [chosen, setChosen] = useState();
    const [conversations, setConversations] = useState([]);
    const [searchRes, setSearchRes] = useState([]);

    const url = "http://localhost:5000"
    const match = useRouteMatch();
    const history = useHistory();
    const token = localStorage.getItem('x-token')
    const searchInputRef = useRef();

    const getConversations = () => {
        fetch(
            url + "/dashboard/conversations",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-token': token
                },
                mode: 'cors'
            }

        ).then((res) => {
            if (res.status === 201 || res.status === 200) return res.json();
            else if (res.status === 409) {
                setSearchRes([]);
                toaster.error("Conversation already exists");

            }
            else history.push('/')
        }).then((data) => {
            setConversations(data.conversations)

        }).catch((error) => {
            console.log(error)
            setAuthentication(false);
        })
    }

    const getContacts = () => {
        fetch(
            url + "/dashboard/search?query=" + searchInputRef.current.value,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-token': token
                },
                mode: 'cors'
            }

        ).then((res) => {
            if (res.status === 201 || res.status === 200) return res.json();
            else if (res.status === 409) {
                setSearchRes([]);
                toaster.error("Conversation already exists");
            }
        }).then((data) => {
            setSearchRes(data.conversations)
        }).catch((error) => {
            console.log(error);
            setAuthentication(false);
        })
    }

    const addContact = (id) => {
        setSearchRes([]);
        searchInputRef.current.value = "";
        fetch(
            url + "/dashboard/conversations",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify({ 'recipient': id }),
                mode: 'cors'
            }

        ).then((res) => {
            if (res.status === 201 || res.status === 200) return res.json();
            else if (res.status === 409) {
                toaster.error("Conversation already exists");
                setChosen(chosen.id)
                throw ("Conversation exists");
            }
            else history.push('/')
        }).then((data) => {
            setConversations(conversations => [...conversations, data.conversation]);
            setChosen(data.conversation.id)
            history.push(`${match.path}/${data.conversation.id}`);
        }).catch((error) => {
            console.log(error);
            setAuthentication(false);
        })
    }

    const logout = () => {
        setAuthentication(false);

        fetch(
            url + "/auth/logout",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-token': token
                },
                mode: 'cors'
            }
        ).then((res) => {
            if (res.status === 200) return res.json();
        }).then((data) => {
            localStorage.removeItem('x-token');
            history.push('/');
        }).catch((error) => {
            console.log(error)
            history.push('/');

        })
    }
    useEffect(() => {
        getConversations()

        setChosen(chatId)
        searchInputRef.current.value = "";
    }, [chatId, isAuthenticated])


    return (
        <section className="contact_list">
            <div className="name">
                <h1>Contacts</h1>
            </div>
            <input className="search" id="search" type="text" placeholder="Search" ref={searchInputRef} onChange={() => getContacts()} autoComplete="off" />
            <br />
            <div className="list">
                {
                    searchRes.length === 0 ?
                        conversations.map((conversation) => {
                            return <Link to={`${match.url}/${conversation.id}`} className="link" key={conversation.id} onClick={() => setContact(conversation.username[0])}>
                                <Conversation
                                    key={conversation.id}
                                    conversation={conversation}
                                    setChosen={setChosen}
                                    active={conversation.id == chosen}
                                />
                            </Link>
                        }
                        ) :
                        searchRes.map((res) => {
                            return <div onClick={() => addContact(res.id)} key={res.id}>
                                <Conversation
                                    conversation={res}
                                    setChosen={setChosen}
                                    active={false}
                                />
                            </div>
                        })

                }
            </div>
            <div className="logout" onClick={logout} >
                <BiLogOut />
            </div>
        </section >
    )
}

export default Contacts
