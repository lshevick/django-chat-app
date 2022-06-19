import { useState } from "react";
import Cookies from "js-cookie";
import { RiEdit2Fill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { GoCheck } from 'react-icons/go';

function handleError(err) {
    console.warn(err);
}

const ChatDetail = ({ id, text, username, currentRoom, setChats, chats, getChats }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text)

    const saveText = async (id, newText) => {
        const body = {
            'id': id,
            'text': newText,
            'room': currentRoom.id,
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(body),
        }

        const response = await fetch(`/api/v1/rooms/${currentRoom.id}/chats/${id}/`, options).catch(handleError);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }

        const json = await response.json();


        setChats(chats.map(i => i.id !== json.id ? i : json))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        saveText(id, newText);
        setNewText(text);
        setIsEditing(false);
    }

    const deleteText = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api/v1/rooms/${currentRoom.id}/chats/${id}/`, options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response not ok');
        }

        getChats(currentRoom.id)
    }



    const chatsHTML = (
        <li key={id} className='bg-blue-500 my-3 p-2 rounded-md relative'>
            <div className="chat-info w-full flex justify-between m-0">
                <span className='font-bold inline-block text-white [text-shadow:1px_1px_2px_#333]'>{username}</span>
                <div className="button-div absolute top-0 right-0">
                    <button className="bg-blue-500 hover:bg-blue-600 p-1 text-sm rounded-sm" onClick={() => setIsEditing(true)}> <RiEdit2Fill /> </button>
                    <button className="bg-blue-500 hover:bg-blue-600 p-1 text-sm rounded-sm" onClick={() => deleteText(id)}> <FaTrashAlt /> </button>
                </div>
            </div>
            <p>{text}</p>
        </li>
    )

    const editHTML = (
        <li key={id} className='bg-blue-500 my-3 p-2 rounded-md relative'>
            <div className="chat-info w-full flex justify-between m-0">
                <span className='font-bold inline-block text-white [text-shadow:1px_1px_2px_#333]'>{username}</span>
                <div className="button-div absolute top-0 right-0">
                    <button className="bg-blue-500 hover:bg-blue-600 p-1 text-sm rounded-sm" onClick={() => setIsEditing(false)}> <RiEdit2Fill /> </button>
                    <button className="bg-blue-500 hover:bg-blue-600 p-1 text-sm rounded-sm"> <FaTrashAlt /> </button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input className='text-slate-700' autoComplete="off" type='text' value={newText} onChange={(e) => setNewText(e.target.value)} />
                <button className="bg-emerald-700 m-2"> <GoCheck /> </button>
            </form>
        </li>
    )

    return (
        <>
            {isEditing ? editHTML : chatsHTML}
        </>
    );
}

export default ChatDetail;