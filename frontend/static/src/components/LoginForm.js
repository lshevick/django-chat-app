import { useState } from 'react';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const LoginForm = ({ setAuth, setScreen }) => {
    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const handleInput = e => {
        const { value, name } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/dj-rest-auth/login/', options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response not ok');
        }

        const json = await response.json()

        Cookies.set('Authorization', `Token ${json.key}`);
        setAuth(true);
    }


    return (
        <div className='w-5/6'>   
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center items-center w-full'>
                <label htmlFor="username"></label>
                <input className='m-2 p-1 bg-slate-200 text-slate-600 rounded-md' placeholder='Username' name='username' type="text" value={state.username} id='username' required onChange={handleInput} />
                <label htmlFor="password"></label>
                <input className='m-2 p-1 bg-slate-200 text-slate-600 rounded-md' placeholder='Password' name='password' type="password" value={state.password} id='password' required onChange={handleInput} />
            <button type='submit' className='bg-green-700 hover:bg-emerald-600 mt-2 w-1/4 rounded-md shadow-md p-1 text-white'>Login</button>
            </div>
        </form>

        <div className='flex justify-evenly my-3 p-1'>
        <p>New here?</p>
            <button className='underline' type="button" onClick={() => setScreen('register')}>Register!</button>
        </div>
        </div>
    );
}

export default LoginForm;