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
        <div>   
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input name='username' type="text" value={state.username} id='username' required onChange={handleInput} />
                <label htmlFor="password">Password</label>
                <input name='password' type="password" value={state.password} id='password' required onChange={handleInput} />
            </div>
            <button type='submit'>Login</button>
        </form>

        <p>New here? Register below:</p>
            <button type="button" onClick={() => setScreen('register')}>Register</button>
        </div>
    );
}

export default LoginForm;