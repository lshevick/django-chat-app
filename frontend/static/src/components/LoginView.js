import { useState } from "react";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginView = ({ setAuth }) => {
    const [screen, setScreen] = useState('login');

    return (
        <div className="login-view">
            <h1>Chat App</h1>
            {screen === 'login' && <LoginForm setScreen={setScreen} setAuth={setAuth} />}
            {screen === 'register' && <RegisterForm setScreen={setScreen} />}
        </div>
    );
}

export default LoginView;