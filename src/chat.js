import React, {useState} from 'react'

import { AttachFile, MoreVert, SearchOutlined, Mic, InsertEmoticon } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import axios from "./axios";

import './chat.css';

function Chat({ messages }) {

    const [input, setInput] = useState("");

    const sendMessage  = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            message:input,
            name:"Demo App",
            timestamp:"Just now!",
            recieved: false
        });

        setInput("");
    };


    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />

                <div className='chat__headerInfo'>
                    <h3>Room name</h3>
                    <p>Last seen at...</p>    
                </div>

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${!message.recieved && "chat__reciever"}`}>
                        <span className='chat__name'>{message.name}</span>
                            {message.message}
                        <span className='chat__timestamp'>{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <IconButton>
                    <InsertEmoticon />  
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;