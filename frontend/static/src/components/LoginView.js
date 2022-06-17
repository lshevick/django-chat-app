import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginView = ({ setAuth }) => {
    const [screen, setScreen] = useState('login');

    return (
        <div className="login-view">
            <h1>Homebase Chatrooms</h1>
            {screen === 'login' && <LoginForm setScreen={setScreen} setAuth={setAuth} />}
            {screen === 'register' && <RegisterForm setScreen={setScreen} />}
        </div>
    );
}

export default LoginView;