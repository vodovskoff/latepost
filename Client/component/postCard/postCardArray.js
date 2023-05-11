import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from '../loginForm/loginForm.module.scss';
import {useDispatch, useSelector} from 'react-redux'
import {getAllPostsInfo} from "../../store/slices/getAllPostsSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import PostCard from "./postCard";
import PostForm from "../postForm/postForm";

const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

export default function PostCardArray() {

    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.allPosts.info)

    useEffect(() => {
        dispatch(getAllPostsInfo())
        console.log('effect')
    },[])
    if (allPosts.isLoading || !isIterable(allPosts.data)) {
        console.log('load')
    } else {
        return (allPosts.data.map(post => <PostForm post={post}></PostForm>));
    }
}