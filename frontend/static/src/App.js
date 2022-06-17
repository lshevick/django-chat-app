import { useState } from 'react'
import Cookies from 'js-cookie';
import './App.css';
import LoginView from './components/LoginView';
import Homescreen from './components/Homescreen';

function handleError(err) {
  console.warn(err);
}

function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));

  // const [state, setState] = useState({
  //   text: '',
  //   room: '',
  //   user: '',
  // })

  // const handleChatSubmit = async (e) => {
  //   e.preventDefault();
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'applicaiton/json',
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //     body: JSON.stringify(state),
  //   }

  //   const response = await fetch(`/api/v1/rooms/${state.room}/chats/`, options).catch(handleError);

  //   if(!response.ok) {
  //     throw new Error('Network response is not ok');
  //   }

  //   const json = await response.json()

  //   setState.text(json.text)
  //   setState.room(json.room)
  // }


  // const RoomList = (
  //   <div>
  //     <div className='room-list-display'>
  //       <div className='sidebar-banner'>
  //         <h1>Rooms</h1>
  //         <input type="checkbox" name="sidebar" id="sidebar" />
  //         <label htmlFor="sidebar">
  //           <span>-</span>
  //           <span>-</span>
  //         </label>
  //       </div>
  //       <ul className='room-'>
  //         <li> <button className='room-select-button'>Room 1</button> </li>
  //         <li> <button className='room-select-button'>Room 2</button> </li>
  //       </ul>
  //     </div>
  //     <div className='chat-room-display'>
  //       <h2>Room Title</h2>
  //       <div className="message-list">
  //         <ul>
  //           <li>
  //             <p>Author of message</p>
  //             <span>1:42pm</span>
  //             <p>text content of message</p>
  //           </li>
  //           <li>
  //             <p>Author of message</p>
  //             <span>1:43pm</span>
  //             <p>text content of message</p>
  //           </li>
  //           <li>
  //             <p>Author of message</p>
  //             <span>1:55pm</span>
  //             <p>text content of message</p>
  //           </li>
  //         </ul>
  //       </div>
  //       <div className='message-form'>
  //         <form onSubmit={handleChatSubmit}>
  //           <label htmlFor="chat">New Chat</label>
  //           <input name='chat' value={state.text} id='chat' type="text" onChange={handleInput} />
  //           <button type='submit'>Send</button>
  //         </form>

  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <>
      {auth ? <Homescreen/> : <LoginView setAuth={setAuth} />}
    </>
  );
}

export default App;
