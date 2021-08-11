import React from 'react'

const Conversation = ({ conversation, setChosen, active }) => {
    return (
        <div className={active ? 'row clicked' : 'row'} onClick={() => setChosen(conversation.id)}>
            <div className="initials">
                <p>{conversation.username[0].toUpperCase()}</p>
            </div>
            <div className="column">
                <h1>{conversation.username.toUpperCase()}</h1>
            </div>
        </div>

    )
}

export default Conversation
