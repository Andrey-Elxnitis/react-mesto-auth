import React from 'react';
import logo from '../images/logo.png';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

function Header(props) {

  //возвращаем разметку шапки сайта
  return (
      <header className="header">
        <div className="header__logo" style={{backgroundImage: `url(${logo})`}}></div>
        <nav className="header__navigation">
          <BrowserRouter>
          <Route path="/sign-up">
            <NavLink to="/sign-in" className="header__link">Войти</NavLink>
          </Route>
          <Route path="/sign-in">
            <NavLink to="/sign-up" className="header__link">Зарегистрироваться</NavLink>
          </Route>
          <Route path="/cards">
            <p className=""></p>
          </Route>
          </BrowserRouter>
        </nav>
      </header>
    );
}

export default Header;