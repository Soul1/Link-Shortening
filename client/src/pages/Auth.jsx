import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/Auth.context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', pass: ''
  });

  useEffect(() => {
    message(error);
    clearError()
  }, [error, message, clearError]);

  const changeHandler = e => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        '/api/auth/register',
        'POST', {...form});
      message(data.massage);
    } catch (e) {
    }
  };
  const loginHandler = async () => {
    try {
      const data = await request(
        '/api/auth/login',
        'POST', {...form});
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  };

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Сокращение ссылок</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input placeholder="Введите email..."
                       id="email"
                       name='email'
                       className='yellow-input'
                       onChange={changeHandler}
                       type='text'/>
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input placeholder="Введите пароль..."
                       id="pass"
                       onChange={changeHandler}
                       type='password'
                       className='yellow-input'
                       name='pass'
                />
                <label htmlFor="pass">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4 logIn'
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className='btn grey lighten-1 darken-1'
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;