import Page from '../../layout/Page/Page';
import React from "react";

export default function MainPage()
{
    return(
        <Page pageTitle={"fet"}>
            <div className="wrapper">
                <div className="sidebar">
                    <form className="login-form">
                        <h2>Вход</h2>
                        <label htmlFor="username">Логин:</label>
                        <input type="text" id="username" name="username"></input>
                            <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" name="password"></input>
                                <button type="submit">Войти</button>
                                <p>Ещё нет аккаунта? <a href="#">Зарегистрируйтесь!</a></p>
                    </form>
                </div>
                <div className="content">
                    <h1>Заголовок страницы</h1>
                    <p>Описание страницы...</p>
                </div>
            </div>
        </Page>
    );
}