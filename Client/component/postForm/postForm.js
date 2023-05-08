import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './postForm.module.scss';
import ls from '../loginForm/loginForm.module.scss';

export default function LoginForm() {
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
                <label for="isEncrypted" class="col-sm-2 col-xl-12 col-form-label">Зашифровать</label>
                <div class="col-sm-10">
                  <input type="checkbox" class="form-check-input" id="isEncrypted" name="isEncrypted"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isAnonymous" class="col-sm-2 col-xl-12 col-form-label">Не указывать автора</label>
                <div class="col-sm-10">
                  <input type="checkbox" class="form-check-input" id="isAnonymous" name="isAnonymous"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="publicationDate" class="col-sm-2 col-xl-12 col-form-label">Дата публикации</label>
                <div class="col-sm-12">
                  <input type="datetime-local" class="form-control" id="publicationDate" name="publicationDate"></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="isReachableById" class="col-sm-2 col-xl-11 col-form-label">Отображать по порядковому номеру</label>
                <div class="col-sm-10">
                  <input type="checkbox" class="form-check-input" id="isReachableById" name="isReachableById"></input>
                </div>
              </div>
              <button type="submit" className={ls.loginFormButton}>Создать</button>
            </form>
                          </div>
                          </div>
            );
}