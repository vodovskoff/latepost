import Page from '../../layout/Page/Page';
import React from "react";
import LoginForm from '../loginForm/loginForm.js'
import PostForm from '../postForm/postForm.js'
import PostCard from "../postCard/postCard";
import {getJWT} from "../../store/slices/JWT";
import PostCardArray from "../postCard/postCardArray"
export default function MainPage()
{
    return(
        <Page pageTitle={"fet"}>
            <LoginForm></LoginForm>
            {getJWT() ?
            <>
                <PostCardArray></PostCardArray>
            </> :
            <></>}
        </Page>
    );
}