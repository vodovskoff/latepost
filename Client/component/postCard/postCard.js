import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ls from '../loginForm/loginForm.module.scss';

export default function PostCard(props) {
    return(
        <div className={ls.wrapper}>
            <div className={ls.sidebar}>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-xl-12">
                    <div class="form-group">
                        <label for="customId">Custom ID:</label>
                        <input type="text" class="form-control" id="customId" value="{{ post.getCustomId() }}"></input>
                    </div>
                    <div class="form-group">
                        <label for="mainText">Main Text:</label>
                        <textarea class="form-control" id="mainText" rows="5">{props.post ? props.post.mainText : "loading"}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="descriptionText">Description Text:</label>
                        <textarea class="form-control" id="descriptionText" rows="3">ТУТ ОПИСАНИЕ</textarea>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>);
}