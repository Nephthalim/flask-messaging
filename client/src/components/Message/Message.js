import React from 'react'
import './Message.css'


const Message = (props) => {
    return (
        <li className={props.my_message ? 'my_message message' : 'their_message message'}>
            <div className='card'>
                <div className='content'>
                    {!props.my_message ?
                        (<div className="initials">
                            <p>
                                {props.name.toUpperCase()}
                            </p>
                        </div>)
                        : null
                    }
                    <div className='text_message'>
                        {props.message}
                    </div>
                </div>
                <div className='time_sent'>{props.time_sent}</div>
            </div>

        </li>


    )
}

export default Message
