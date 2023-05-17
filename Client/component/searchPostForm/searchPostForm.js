import React, { useState } from 'react';
import s from './../loginForm/loginForm.module.scss';
import ps from './postForm.module.scss';
import axios from 'axios';
import { registrationSlice } from '../../store/slices/registrationSlice';
import { loginSlce, loginSlice } from '../../store/slices/loginSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { getPostByIdInfo } from '../../store/slices/postByIdSlice';
import PostCard from '../postCard/postCard';

export default function SearchPostForm() {
    const post = useAppSelector(state => state.postById.info);
    const dispatch = useAppDispatch();

    const [showPostCard, setShowPostCard] = useState(false);

    function onFind() {
        const customIDInput = document.getElementById('customID');
        const customID = customIDInput.value;
        customIDInput.value = '';

        dispatch(getPostByIdInfo(customID));
        setShowPostCard(true);
    }

    return (
        <div className={ps.wrapper}>
            <div className={s.sidebar}>
                <form className={s.loginForm}>
                    <h2 className={s.loginFormH2}>Найти пост по ID</h2>
                    <label className={s.lable} htmlFor="customID">
                        ID или CustomID:
                    </label>
                    <input className={s.loginFormInput} type="text" id="customID" name="customID" />
                    <div className="row">
                        <div className="mb-1 col-12">
                            <button onClick={onFind} className="btn btn-light col-12" type="button">
                                Найти
                            </button>
                        </div>
                    </div>
                </form>
                <p id="error_box">{post.error ? "Поиск не удался" : null}</p>
            </div>
            <div className="CardParent">
                {showPostCard && !post.error && <PostCard post={post} />}
            </div>
        </div>
    );
}
