import React, { useEffect, useState } from 'react';
import s from './loginForm.module.scss';
import axios from 'axios';
import { registrationSlice } from '../../store/slices/registrationSlice';
import { loginSlce, loginSlice } from '../../store/slices/loginSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getJWT, parseJwt } from '../../store/slices/JWT';
import Cookies from 'js-cookie';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const deleteAllCookies = () => {
        Cookies.remove('JWT');
        Cookies.remove('refresh_token');
        window.location.reload();
    }

    const getDataForLoginOrRegister = () => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value;
        const password = passwordInput.value;

        usernameInput.value = '';
        passwordInput.value = '';

        let data = new Object();
        data.username = username;
        data.password = password;
        return data;
    };

    function onRegistration() {
        const errorBox = document.getElementById('error_box');
        let data = getDataForLoginOrRegister();
        return registrationSlice(data, errorBox);
    }

    function onLogin() {
        const errorBox = document.getElementById('error_box');
        let data = getDataForLoginOrRegister();
        return loginSlice(data, errorBox);
    }

    if (getJWT()) {
        return (
            <div className={s.wrapper}>
                <div className={s.sidebar}>
                    <h2>Добро пожаловать, {parseJwt(getJWT()).username}!</h2>
                    <button onClick={deleteAllCookies} className="btn btn-light col-12" type="button">
                        Выйти
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={s.wrapper}>
            <div className={s.sidebar}>
                <form className={s.loginForm}>
                    <h2 className={s.loginFormH2}>Войти или зарегистрироваться</h2>
                    <label className={s.lable} htmlFor="username">
                        Логин:
                    </label>
                    <input
                        className={s.loginFormInput}
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Пароль:</label>
                    <input
                        className={s.loginFormInput}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="row">
                        <div className="mb-1 col-12">
                            <button onClick={onLogin} className="btn btn-light col-12" type="button">
                                Войти
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-1 col-12">
                            <button
                                onClick={onRegistration}
                                className="btn btn-light col-12"
                                type="button"
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </form>
                <p id="error_box"></p>
            </div>
        </div>
    );
}
