import {useState, useEffect} from 'react';
import MessageList from '../components/MessageList';
import useFetch from '../custom_hooks/useFetch';

function Home(){
    const {data: messages, isPending, error} = useFetch('http://localhost:3000/messages')

    return (
        <div>
            <h1>Home Page</h1>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {messages && <MessageList messages={messages} title="All messages" />}
        </div>
    );
}

export default Home;