import React, { useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar'
import {
    useParams,
    Navigate,
    Outlet,
} from 'react-router-dom'
import './Chat.css'



const Chat = ({ chosen, setChosen, isAuthenticated, setAuthentication }) => {
    
    const token = localStorage.getItem('x-token')
    const { chatId } = useParams();
    
    useEffect(() => {
        if(chatId){
            setChosen(chatId)
        }
        console.log("Here")
    }, [chosen])

    return (
        <>
            {token ?
                <div className='chat'>
                    <SideBar setChosen={setChosen} chosen={chosen} isAuthenticated={isAuthenticated} setAuthentication={setAuthentication} />
                    <Outlet />
                </div>
                : <Navigate to="/" />
            } 
        </>
    )
}

export default Chat
