import React, {useEffect, useState} from 'react'
import s from './loginForm.module.scss'
import axios from "axios";

export default function LoginForm() {

    const onSubmitLogin = e => {
        console.log(100)
    };

    const onSubmitRegister = e => {
        console.log(333)
    };

    function registration() {

        const usernameInput = document.getElementById("username")
        const passwordInput = document.getElementById("password")

        const username = usernameInput.value
        const password = passwordInput.value

        usernameInput.value = ""
        passwordInput.value = ""
        let data = new Object()
        data.username = username
        data.password = password

        return axios({
            method: 'post',
            url: 'api' + '/registration',
            data: data
        })
            .then(res => {
                return {data: res.data}
            })
            .catch(err => {
                if (err.response.data.status===409) {
                    const errorBox = document.getElementById("error_box")
                    errorBox.innerText = "Пользователь уже зарегистрирован"
                }
                return {error: err.response.data}
            });


    }


    return(
            <div className={s.wrapper}>
                <div className={s.sidebar}>
                    <form className={s.loginForm}>
                        <h2 className={s.loginFormH2}>Войти или зарегистрироваться</h2>
                        <label className={s.lable} htmlFor="username">Логин:</label>
                        <input className={s.loginFormInput} type="text" id="username" name="username"></input>
                            <label htmlFor="password">Пароль:</label>
                        <input className={s.loginFormInput} type="password" id="password" name="password"></input>
                        <button onClick={onSubmitLogin} className={s.loginFormButton} type="button">Войти</button>
                        <button onClick={registration} className={s.loginFormButton} type="button">Зарегистрироваться</button>
                    </form>
                    <p id="error_box"></p>
                </div>
            </div>
);
}