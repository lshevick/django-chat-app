import { useState } from 'react'
import Cookies from 'js-cookie';
import './App.css';
import LoginView from './components/LoginView';
import Homescreen from './components/Homescreen';


function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));

  return (
    <div className='overflow-hidden'>
      {auth ? <Homescreen setAuth={setAuth}/> : <LoginView setAuth={setAuth} />}
    </div>
  );
}

export default App;
