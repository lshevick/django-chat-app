import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginView = ({ setAuth }) => {
    const [screen, setScreen] = useState('login');

    return (
        <div className="login-view flex flex-col justify-center items-center h-screen text-slate-100 p-5">
            <h1 className="m-2 py-1 text-2xl [text-shadow:1px_3px_2px_#333] font-extrabold text-emerald-700 absolute top-1/4">Homebase Chatrooms</h1>
            {screen === 'login' && <LoginForm setScreen={setScreen} setAuth={setAuth} />}
            {screen === 'register' && <RegisterForm setScreen={setScreen} />}
        </div>
    );
}

export default LoginView;