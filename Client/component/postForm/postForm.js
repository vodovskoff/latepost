import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './postForm.module.scss';
import ls from '../loginForm/loginForm.module.scss';
import {registrationSlice} from "../../store/slices/registrationSlice";
import {createPostSlice} from "../../store/slices/createPostSlice";



export default function PostForm() {

  const getDataForCreatePost = ()=> {

    const customIdInput = document.getElementById("customId")
    const mainText = document.getElementById("mainText")
    const descriptionTextInput = document.getElementById("descriptionText")
    const isEncryptedInput = document.getElementById("isEncrypted")
    const isAnonymousInput = document.getElementById("isAnonymous")
    const publicationDateInput = document.getElementById("publicationDate")
    const isReachableByIdInput = document.getElementById("isReachableById")

    let data = new Object()
    data.customId = customIdInput.value==="" ? null : customIdInput.value
    data.mainText = mainText.value
    data.descriptionText = descriptionTextInput.value
    data.isEncrypted = isEncryptedInput.checked
    data.isAnonymous = isAnonymousInput.checked
    data.publicationDate = publicationDateInput.value
    data.isReachableById = isReachableByIdInput.checked

    return data;
  }


  function onCreatePost() {
    const errorBox = document.getElementById("error_box")
    errorBox.innerText = ""
    let data = getDataForCreatePost();
    return createPostSlice(data, errorBox)
  }
            return(
            <div className={ls.wrapper}>
              <div className={ls.sidebar}>
              <form className={ls.loginForm} action="{{ path('post_create') }}" method="post">
              <div class="form-group row">
                <label for="customId" class="col-sm-2 col-xl-12 col-form-label">CustomID</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control success" id="customId" name="customId"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="mainText" class="col-sm-2 col-xl-12 col-form-label">Основной текст</label>
                <div class="col-sm-12">
                  <textarea class="form-control" id="mainText" name="mainText"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="descriptionText" class="col-sm-2 col-xl-12 col-form-label">Описание</label>
                <div class="col-sm-12">
                  <textarea class="form-control" id="descriptionText" name="descriptionText"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="isEncrypted" class="col-sm-10 col-md-10 col-xl-10 col-form-label">Зашифровать</label>
                <div class="align-self-center col-sm-2 col-md-2 col-xl-2">
                  <input type="checkbox" class="form-check-input" id="isEncrypted" name="isEncrypted"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isAnonymous" class="align-self-center col-sm-10 col-md-10 col-xl-10 col-form-label">Не указывать автора</label>
                <div class="col-sm-2 col-md-2">
                  <input type="checkbox" class="form-check-input" id="isAnonymous" name="isAnonymous"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="publicationDate" class="col-sm-2 col-xl-10 col-form-label">Дата публикации</label>
                <div class="col-sm-12">
                  <input type="datetime-local" class="form-control" id="publicationDate" name="publicationDate"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isReachableById" class="col-sm-2 col-md-10 col-xl-10 col-form-label">Отображать по порядковому номеру</label>
                <div class="align-self-center col-sm-10 col-md-2 col-xl-2">
                  <input type="checkbox" class="form-check-input" id="isReachableById" name="isReachableById"></input>
                </div>
              </div>
              <button type="button" onClick={onCreatePost} className={ls.loginFormButton}>Создать</button>
                <p id="error_box"></p>
            </form>
              </div>
            </div>
            );
}