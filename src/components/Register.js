import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const {
      onSignup
    } = props

    //email и password пользователя состояние изначально пустая строка
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // функция отслеживает ввод email
    function handleEmailRegister(e) {
        setEmail(e.target.value);
    }

    // функция для отслеживания ввода пароля
    function handlePasswordRegister(e) {
        setPassword(e.target.value);
    }

    // функция для отправки данных
    function handleSubmitRegister(e) {
        e.preventDefault();
        onSignup(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmitRegister}>
            <h3 className="popup__title login__title">Регистрация</h3>
            <input
              className="popup__input login__input"
              name="userEmail"
              type="email"
              placeholder="Email"
              onChange={handleEmailRegister}
              value={email || ''}
              required
            />
            <input
              className="popup__input login__input"
              name="userPassword"
              type="password"
              placeholder="Пароль"
              onChange={handlePasswordRegister}
              value={password || ''}
              required
            />
            <button className="popup__button login__button" type="submit">Зарегистрироваться</button>
            <Link to='/sign-in' className="login__link">Уже зарегистрированы? Войти</Link>  

        </form>
    )
}

export default Register;