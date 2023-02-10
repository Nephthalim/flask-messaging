import React from 'react'
import './Message.css'


const Message = (props) => {
    return (
        <li className={props.my_message ? 'my_message message' : 'their_message message'}>
            <div className='card'>
                <div className='content'>
                    <div className='name'>
                    {props.my_message ?
                        <p>You </p>:
                        <p>{props.name[0].toUpperCase() + props.name.substr(1)}</p>
                    }
                    </div>
                    <div>
                        <div className='text_message'>
                            {props.message}
                        </div>
                    </div>
                </div>
                <div className='time_sent'>{props.time_sent}</div>
            </div>

        </li>


    )
}

export default Message
