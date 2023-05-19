import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from '../loginForm/loginForm.module.scss';
import s from './postCard.module.scss'
export default function PostCard(props) {
    if (props.post.isLoading) {
        console.log(props)
    } else {
        return(
            <div className={s.wrapper}>
                <div className={ls.sidebar}>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-xl-12">
                        <div class="form-group">
                            <label for="customId">Custom ID:</label>
                            <input type="text" class="form-control" id="customId" value={props.post.data.customId? props.post.data.customId : "Отсутствует"}></input>
                        </div>
                        <div class="form-group">
                            <label for="mainText">Main Text:</label>
                            <p class="form-control" id="mainText" rows="5">{props.post? props.post.data.mainText : "laod"}</p>
                        </div>
                        <div class="form-group">
                            <label for="descriptionText">Description Text:</label>
                            <p class="form-control" id="descriptionText" rows="3">{props.post.data.descriptionText? props.post.data.descriptionText : "loading"}</p>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>);
    }
}