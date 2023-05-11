import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './postForm.module.scss';
import ls from '../loginForm/loginForm.module.scss';
import {registrationSlice} from "../../store/slices/registrationSlice";
import {createPostSlice} from "../../store/slices/createPostSlice";
import moment from "moment/moment";
import {post} from "axios";


export default function PostForm(props) {

  const getDataForCreatePost = ()=> {

    let check = "customId"+props.post ? props.post.id : ""
    const customIdInput =  document.getElementById(elementIdByPostId("customId"))
    const mainText = document.getElementById(elementIdByPostId("mainText"))
    const descriptionTextInput = document.getElementById(elementIdByPostId("descriptionText"))
    const isEncryptedInput = document.getElementById(elementIdByPostId("isEncrypted"))
    const isAnonymousInput = document.getElementById(elementIdByPostId("isAnonymous"))
    const publicationDateInput = document.getElementById(elementIdByPostId("publicationDate"))
    const isReachableByIdInput = document.getElementById(elementIdByPostId("isReachableById"))
    const idInput = props.post ? document.getElementById(elementIdByPostId("postId")) : undefined

    let data = new Object()
    data.customId = customIdInput.value==="" ? null : customIdInput.value
    data.mainText = mainText.value
    data.descriptionText = descriptionTextInput.value
    data.isEncrypted = isEncryptedInput.checked
    data.isAnonymous = isAnonymousInput.checked
    data.publicationDate = publicationDateInput.value
    data.isReachableById = isReachableByIdInput.checked
    if (idInput) {
      data.id = idInput.value
    }
    return data;
  }

  const elementIdByPostId = (elementName) => {
    let ans = props.post ? `${elementName}`+props.post.id : `${elementName}`
    return ans
  }

  const addZero = (x) => {
    let ans = "";
    x<10 ? ans =  "0"+`${x}` : ans = x;
    return ans
  }

  const localeDate = (dateObject) => {
    let date = new Date(dateObject.date)
    let mom = moment(date)
    return mom.format("YYYY-MM-DDTkk:mm")
  }

  function onCreatePost() {
    const errorBox = document.getElementById(elementIdByPostId("error_box"))
    errorBox.innerText = ""
    let data = getDataForCreatePost();
    return createPostSlice(data, errorBox)
  }
            return(
            <div id={props.post ? "postForm"+props.post.id : ""} className={ls.wrapper}>
              <div className={ls.sidebar}>
              <form className={ls.loginForm} action="{{ path('post_create') }}" method="post">
              <div class="form-group row">
                <label for="customId" class="col-sm-2 col-xl-12 col-form-label">CustomID</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control success" defaultValue={props.post ? props.post.customId : ""} id={elementIdByPostId("customId")} name="customId"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="mainText" class="col-sm-2 col-xl-12 col-form-label">Основной текст</label>
                <div class="col-sm-12">
                  <textarea class="form-control" id={elementIdByPostId("mainText")} defaultValue={props.post ? props.post.mainText : ""} name="mainText"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="descriptionText" class="col-sm-2 col-xl-12 col-form-label">Описание</label>
                <div class="col-sm-12">
                  <textarea class="form-control" id={elementIdByPostId("descriptionText")} defaultValue={props.post ? props.post.descriptionText : ""} name="descriptionText"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="isEncrypted" class="col-sm-10 col-md-10 col-xl-10 col-form-label">Зашифровать</label>
                <div class="align-self-center col-sm-2 col-md-2 col-xl-2">
                  <input type="checkbox" class="form-check-input" id={elementIdByPostId("isEncrypted")} defaultValue={props.post ? props.post.isEncrypted : ""} name="isEncrypted"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isAnonymous" class="align-self-center col-sm-10 col-md-10 col-xl-10 col-form-label">Не указывать автора</label>
                <div class="col-sm-2 col-md-2">
                  <input type="checkbox" class="form-check-input" id={elementIdByPostId("isAnonymous")} defaultValue={props.post ? props.post.isEncrypted : ""} name="isAnonymous"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="publicationDate" class="col-sm-2 col-xl-10 col-form-label">Дата публикации</label>
                <div class="col-sm-12">
                  <input type="datetime-local" class="form-control" id={elementIdByPostId("publicationDate")} defaultValue={props.post ? localeDate(props.post.publicationDate) : ""} name="publicationDate"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isReachableById" class="col-sm-2 col-md-10 col-xl-10 col-form-label">Отображать по порядковому номеру</label>
                <div class="align-self-center col-sm-10 col-md-2 col-xl-2">
                  <input type="checkbox" class="form-check-input" defaultValue={elementIdByPostId("isReachableById")} id={props.post ? "isReachableById"+props.post.id : "isReachableById"} name="isReachableById"></input>
                  <input type="hidden" id={elementIdByPostId("postId")} value={props.post ? props.post.id : ""}></input>
                </div>
              </div>
              <button type="button" onClick={onCreatePost} className={ls.loginFormButton}>{props.post ? "Редактировать" : "Создать"}</button>
                <p id={elementIdByPostId("error_box")}></p>
            </form>
              </div>
            </div>
            );
}