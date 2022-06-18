import ChatForm from './ChatForm';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const Homescreen = ({setAuth}) => {
    const [chats, setChats] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');
    const [currentRoom, setCurrentRoom] = useState({ name: 'Pick a room' });


    // this useEffect displays all of the avaliable rooms on page load
    useEffect(() => {
        const getRooms = async () => {
            const response = await fetch('/api/v1/rooms/').catch(handleError);

            if (!response.ok) {
                throw new Error('Network response is not ok')
            }

            const json = await response.json();
            setRooms(json);
        }
        getRooms();
    }, [])

    const getChats = async (room) => {
        const response = await fetch(`/api/v1/rooms/${room}/chats`).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        const json = await response.json();
        setChats(json);
    }


    // this is here to update the chat rooms when someone is sending messages and someone else is in the same chat room,
    // it updates state every 3 seconds so either person can see each others messages in real-ish time

    // useEffect(() => {
    //     const id = setInterval(() => {
    //         getChats(currentRoom.id)

    //     }, 3000)
    //     return () => clearInterval(id)
    // }, [chats])


    const roomsHTML = rooms.map(room => (
        <li key={room.id}>
            <button type='button' onClick={() => { setCurrentRoom(room); getChats(room.id) }}>{room.name}</button>
        </li>
    ))


    const chatsHTML = chats.map(chat => (
        <li key={chat.id}>
            <span>{chat.username}</span>
            <p>{chat.text}</p>
        </li>
    ))

    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify({name: newRoom}),
        }

        const response = await fetch('/api/v1/rooms/', options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response not ok')
        }

        const json = await response.json()
        setRooms([...rooms, json])

    }

    return (

        <div>
            <div className='room-list-display'>
                <div className='sidebar-banner'>
                    <h1>Rooms</h1>
                    <input type="checkbox" name="sidebar" id="sidebar" />
                    <label htmlFor="sidebar">
                        <span>-</span>
                        <span>-</span>
                    </label>
                </div>
                <ul className='room-list'>
                    {roomsHTML}
                </ul>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="new-room">Create a Room</label>
                        <input name='new-room' id='new-room' value={newRoom} type="text" onChange={(e) => setNewRoom(e.target.value)} />
                        <button type='submit'>Add Room</button>
                    </form>
                </div>
                <button type='button' onClick={() => setAuth(false)}>Logout</button>
            </div>
            <div className='chat-room-display'>
                <h2>{currentRoom.name}</h2>
                <div className="message-list">
                    <ul>
                        {chatsHTML}
                    </ul>
                </div>

                <ChatForm currentRoom={currentRoom} chats={chats} setChats={setChats} />

            </div>
        </div>
    );
}

export default Homescreen;