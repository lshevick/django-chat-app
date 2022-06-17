import { useState } from "react";
import Cookies from "js-cookie";

function handleError(err) {
    console.warn(err);
}

const ChatForm = ({ currentRoom, chats, setChats }) => {
    const [text, setText] = useState('');

    const handleInput = e => {
        setText(e.target.value)
    }

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify({text: text, room: currentRoom.id}),
        }

        const response = await fetch(`/api/v1/rooms/${currentRoom.id}/chats/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok');
        }

        const json = await response.json()
        console.log(json)
        setChats([...chats, json])
        setText('')
    }

    return (
        <div className='message-form'>
            <form onSubmit={handleChatSubmit}>
                <label htmlFor="chat">New Chat</label>
                <input name='text' value={text} id='text' type="text" onChange={handleInput} />
                <button type='submit'>Send</button>
            </form>

        </div>
    );
}

export default ChatForm