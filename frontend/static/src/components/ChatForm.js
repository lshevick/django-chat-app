import { useState } from "react";
import Cookies from "js-cookie";
import { BsFillCursorFill } from 'react-icons/bs'

function handleError(err) {
    console.warn(err);
}

const ChatForm = ({ currentRoom, chats, setChats, dummy }) => {
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
            body: JSON.stringify({ text: text, room: currentRoom.id }),
        }

        const response = await fetch(`/api/v1/rooms/${currentRoom.id}/chats/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok');
        }

        const json = await response.json()
        console.log(json)
        setChats([...chats, json])
        setText('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className='message-form w-full'>
            <form onSubmit={handleChatSubmit} className='md:float-right w-full'>
                <label htmlFor="chat"></label>
                <input className='bg-slate-600 p-1 w-5/6' name='text' value={text} id='text' type="text" onChange={handleInput} placeholder='Send a message...' />
                <button type='submit' className='bg-emerald-700 m-2 p-3 rounded-md hover:text-emerald-500 hover:bg-emerald-200 hover:rounded-2xl transition-all'> <BsFillCursorFill/> </button>
            </form>

        </div>
    );
}

export default ChatForm