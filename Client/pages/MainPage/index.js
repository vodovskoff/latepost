import Page from '../../layout/Page/Page';
import React from "react";
import LoginForm from '../../component/loginForm/loginForm.js'
import PostForm from '../../component/postForm/postForm.js'
import PostCard from "../../component/postCard/postCard";

export default function MainPage()
{
    return(
        <Page pageTitle={"fet"}>
            <LoginForm></LoginForm>
            <PostForm></PostForm>
            <PostCard></PostCard>
        </Page>
    );
}