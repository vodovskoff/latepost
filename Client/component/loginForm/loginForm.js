import React, {useEffect, useState} from 'react'
import s from './loginForm.module.scss'
export default function LoginForm() {
            return(
            <div className={s.wrapper}>
                <div className={s.sidebar}>
                    <form className={s.loginForm}>
                        <h2 className={s.loginFormH2}>Войти или зарегистрироваться</h2>
                        <label className={s.lable} htmlFor="username">Логин:</label>
                        <input className={s.loginFormInput} type="text" id="username" name="username"></input>
                            <label htmlFor="password">Пароль:</label>
                        <input className={s.loginFormInput} type="password" id="password" name="password"></input>
                        <button className={s.loginFormButton} type="submit">Войти</button>
                        <button className={s.loginFormButton} type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
            );
}