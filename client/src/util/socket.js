import { io } from "socket.io-client";

const socket = {

    self: io('http://localhost:5000/'),

    join: (convId) => {
        this.socket.emit('join', { conversation_id: convId })
    },

    sendMsg: (convId, msg) => {
        this.socket.emit('message', { "conversation_id": convId, "msg": msg })
    }

}

export default socket;