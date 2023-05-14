import Page from '../../layout/Page/Page';
import React from "react";
import LoginForm from '../loginForm/loginForm.js'
import PostForm from '../postForm/postForm.js'
import PostCard from "../postCard/postCard";
import {getJWT} from "../../store/slices/JWT";
import PostCardArray from "../postCard/postCardArray"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainPage()
{
    return(
        <Page pageTitle={"fet"}>
            {getJWT() ?
            <>
                <div class="row">
                    <div className="col-xl-3 col-md-3 col-sm-12 col-lg-3">
                        <LoginForm></LoginForm>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
                        <PostForm></PostForm>
                        <PostCardArray></PostCardArray>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-12 col-lg-3">
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </> :
            <>
                <div className="col-xl-3 col-md-3 col-sm-12 col-lg-3">
                    <LoginForm></LoginForm>
                </div>
            </>}
        </Page>
    );
}