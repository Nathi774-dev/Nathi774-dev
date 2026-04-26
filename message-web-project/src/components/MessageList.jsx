// the message display component using props
import {useState} from 'react';
import { Link } from 'react-router';

const MessageList = ({ messages, title }) => {
    return (
        <div className="message-list">
        <h2>{title}</h2>
            {messages.map((message) => (
                <div className="message-preview" key={message.id}>
                    <Link to={`/message/${message.id}`}>
                        <p>{message.text}</p>
                        <p className='author'>Written by {message.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default MessageList;