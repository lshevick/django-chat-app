import { BsChevronLeft } from 'react-icons/bs'
import ChatForm from './ChatForm';
import { useEffect, useState, useRef } from "react";
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const Homescreen = ({ setAuth }) => {
    const [chats, setChats] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');
    const [currentRoom, setCurrentRoom] = useState({ name: 'Pick a room' });
    const [isOpen, setIsOpen] = useState(true);
    const dummy = useRef()


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
            <button className='text-gray-100 font-bold bg-emerald-900 p-2 m-3 shadow-md rounded-md' type='button' onClick={() => { setCurrentRoom(room); getChats(room.id); setIsOpen(!isOpen)}}>{room.name}</button>
        </li>
    ))


    const chatsHTML = chats.map(chat => (
        <li key={chat.id} className='bg-slate-600 my-2 p-2'>
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
            body: JSON.stringify({ name: newRoom }),
        }

        const response = await fetch('/api/v1/rooms/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok')
        }

        const json = await response.json()
        setRooms([...rooms, json])

    }

    return (

        <div className={`h-screen flex flex-col justify-end ${isOpen ? 'transparent' : 'bg-slate-700'}`}>
            <div className='room-list-display absolute w-full top-0'>
                <div className='sidebar-banner bg-slate-700 flex justify-between border-b-2 border-zinc-600 py-3'>
                    <h1 className=' mx-2  py-1 text-xl font-extrabold text-emerald-700'>Homebase Rooms</h1>
                    <button type='button' className={`m-1 p-2 bg-slate-500 border-2 border-slate-400 transition-all rounded-3xl ${isOpen ? 'rotate-180' : ''}`} onClick={() => setIsOpen(!isOpen)}> <BsChevronLeft/> </button>
                </div>
                <div className={`bg-slate-700 transition-all duration-300 ${isOpen ? 'translate-x-0 z-10' : 'translate-x-full opacity-0'}`}>

                <ul className='room-list flex flex-col justify-center pl-3 h-3/4'>
                    {roomsHTML}
                </ul>
                <div className='flex flex-col items-start border-t-2 border-zinc-600'>
                    <form onSubmit={handleSubmit} className='flex flex-col flex-center items-start w-1/2 my-3 px-3'>
                        <label htmlFor="new-room"></label>
                        <input className='p-1 rounded-md shadow-md' name='new-room' id='new-room' value={newRoom} type="text" onChange={(e) => setNewRoom(e.target.value)} placeholder='Add a New Room' />
                        <button className='bg-green-700 mt-2 w-3/4 rounded-md shadow-md p-1 text-white' type='submit'>Add Room</button>
                    </form>
                </div>
                <button className='p-1 m-1 mx-3 bg-rose-700 w-1/4 rounded-md' type='button' onClick={() => setAuth(false)}>Logout</button>
                </div>
            </div>


            <div className={`overflow-hidden chat-room-display bg-slate-700 h-[90%] relative bottom-0 text-white px-2 py-5 flex flex-col justify-end transition-all duration-500 ${isOpen ? 'blur z-[-10]' : ''}`}>
                <h2 className='mx-1 absolute top-0 p-2 text-xl font-extrabold text-emerald-700 bg-slate-600 rounded-md'>{currentRoom.name}</h2>
                <div className="message-list overflow-y-scroll h-5/6">
                    <ul>
                       {chatsHTML}
                    </ul>
                       <div className='h-20' ref={dummy}></div>
                </div>

                <ChatForm className='fixed py-10 mt-5 bg-slate-700 bottom-0' currentRoom={currentRoom} chats={chats} setChats={setChats} dummy={dummy} />

            </div>
        </div>
    );
}

export default Homescreen;