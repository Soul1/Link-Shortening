import React, {useState} from 'react';

const Auth = () => {
  const [form, setForm] = useState({
    email: '', pass: ''
  });
  const changeHandler = e => {
    setForm({...form, [e.target.name]: e.target.value})
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
            <button className='btn yellow darken-4 logIn'>Войти</button>
            <button className='btn grey lighten-1 darken-1'>Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;