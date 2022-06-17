import ChatForm from './ChatForm';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function handleError(err) {
    console.warn(err);
}

const Homescreen = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState({name: 'Pick a room'});

    useEffect(() => {
      const getRooms = async () => {
        const response = await fetch('/api/v1/rooms/').catch(handleError);

        if(!response.ok) {
            throw new Error('Network response is not ok')
        }
        
        const json = await response.json();
        setRooms(json);
        }
        getRooms();
    }, [])


    const roomsHTML = rooms.map(room => (
        <li key={room.id}>
            <button type='button' onClick={() => setCurrentRoom(room)}>{room.name}</button>
        </li>
    ))


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
            </div>
            <div className='chat-room-display'>
                <h2>{currentRoom.name}</h2>
                <div className="message-list">
                    <ul>
                        <li>
                            <p>Author of message</p>
                            <span>1:42pm</span>
                            <p>text content of message</p>
                        </li>
                        <li>
                            <p>Author of message</p>
                            <span>1:43pm</span>
                            <p>text content of message</p>
                        </li>
                        <li>
                            <p>Author of message</p>
                            <span>1:55pm</span>
                            <p>text content of message</p>
                        </li>
                    </ul>
                </div>

                <ChatForm />

            </div>
        </div>
    );
}

export default Homescreen;