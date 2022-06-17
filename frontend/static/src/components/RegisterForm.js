import { useState } from "react";
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const RegisterForm = ({ setScreen }) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })
    const [registered, setRegistered] = useState(false)

    const handleInput = e => {
        const { name, value } = e.target;
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
            body: JSON.stringify(state)
        }

        const response = await fetch('/dj-rest-auth/registration/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok')
        }

        setRegistered(true);
        console.log(response, registered);

    }

    const isRegistered = (
        <div>
            <p>Welcome!</p>
            <button type="button" onClick={() => setScreen('login')}>Login</button>
        </div>
    )

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="form-inputs">
                    <label htmlFor="usernanme">Username</label>
                    <input id="username" name="username" onChange={handleInput} value={state.username} type="text" />

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" onChange={handleInput} value={state.email} type="text" />

                    <label htmlFor="password1">Password</label>
                    <input id="password1" name="password1" onChange={handleInput} value={state.password1} type="password" />

                    <label htmlFor="password2">Confim Password</label>
                    <input id="password2" name="password2" onChange={handleInput} value={state.password2} type="password" />
                </div>
                <button type="submit">Register</button>
            </form>

            {registered && isRegistered}
        </div>
    );
}

export default RegisterForm;