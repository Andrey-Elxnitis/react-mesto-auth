import React from 'react';
import logo from '../images/logo.png';
import { Link, Route } from 'react-router-dom';

function Header(props) {

  const {
    user,
    onSignOut,
  } = props

  //возвращаем разметку шапки сайта
  return (
      <header className="header">
        <div className="header__logo" style={{backgroundImage: `url(${logo})`}}></div>
        <nav className="header__navigation">
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route exact path="/">
            <div className="header__info">
              <p className="header__email">{user}</p>
              <button className="header__button" onClick={onSignOut} type="button">Выйти</button>
            </div>
          </Route>
        </nav>
      </header>
    );
}

export default Header;