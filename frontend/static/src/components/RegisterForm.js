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
        <div className="w-5/6">
            <form onSubmit={handleSubmit}>

                <div className="form-inputs flex flex-col justify-center items-center w-full">
                    <label htmlFor="usernanme"></label>
                    <input className="m-2 p-1 bg-slate-200 text-slate-600 rounded-md shadow-md" id="username" name="username" onChange={handleInput} value={state.username} type="text" placeholder="Username"/>

                    <label htmlFor="email"></label>
                    <input className="m-2 p-1 bg-slate-200 text-slate-600 rounded-md shadow-md" id="email" name="email" onChange={handleInput} value={state.email} type="text" placeholder="Email"/>

                    <label htmlFor="password1"></label>
                    <input className="m-2 p-1 bg-slate-200 text-slate-600 rounded-md shadow-md" id="password1" name="password1" onChange={handleInput} value={state.password1} type="password" placeholder="Password"/>

                    <label htmlFor="password2"></label>
                    <input className="m-2 p-1 bg-slate-200 text-slate-600 rounded-md shadow-md" id="password2" name="password2" onChange={handleInput} value={state.password2} type="password" placeholder="Confirm Password"/>
                <button type="submit" className='bg-green-700 hover:bg-emerald-600 mt-2 w-1/4 rounded-md shadow-md p-1 text-white'>Register</button>
                </div>
            <button className='underline m-5' type="button" onClick={() => setScreen('login')}>Back to Login</button>
            </form>


            {registered && isRegistered}
        </div>
    );
}

export default RegisterForm;