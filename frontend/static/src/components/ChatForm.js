import { useState } from "react";
import Cookies from "js-cookie";

function handleError(err) {
    console.warn(err);
}

const ChatForm = () => {
    const [state, setState] = useState({
        text: '',
        room: 2,
    })

    const handleInput = e => {
        const { value, name } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch(`/api/v1/rooms/${state.room}/chats/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok');
        }

        const json = await response.json()
        console.log(json)

        setState({...json, text: ''})
    }

    return (
        <div className='message-form'>
            <form onSubmit={handleChatSubmit}>
                <label htmlFor="chat">New Chat</label>
                <input name='text' value={state.text} id='text' type="text" onChange={handleInput} />
                <button type='submit'>Send</button>
            </form>

        </div>
    );
}

export default ChatForm