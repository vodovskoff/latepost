// @ts-ignore
import React, { useEffect, useState } from "react";
import {render} from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {Provider} from 'react-redux';
import MainPage from "../pages/MainPage";
import {store} from "../store";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}

render(<App/>, document.querySelector("#root"));
