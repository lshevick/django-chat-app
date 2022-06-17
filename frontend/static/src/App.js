import { useState } from 'react'
import Cookies from 'js-cookie';
import './App.css';
import LoginView from './components/LoginView';

function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));


  const RoomList = (
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
        <ul className='room-'>
          <li> <button className='room-select-button'>Room 1</button> </li>
          <li> <button className='room-select-button'>Room 2</button> </li>
        </ul>
      </div>
      <div className='chat-room-display'>
          <h2>Room Title</h2>
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
      </div>
    </div>
  )

  return (
    <>
      {auth ? RoomList : <LoginView setAuth={setAuth} />}
    </>
  );
}

export default App;
