import { apiUrlAuth } from './utils';

// функция отвечает за отправку запроса на регистрацию пользователя
export const register = (email, password) => {
    return fetch(`${apiUrlAuth}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          else {
              return Promise.reject(`Произошла ошибка: ${res.status}`);
          }
      });
};

// функция отвечает за авторизацию пользователя
export const authorize = (email, password) => {
    return fetch(`${apiUrlAuth}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Произошла ошибка: ${res.status}`);
        }
    });
};

export const saveToken = (token) => {
    return fetch(`${apiUrlAuth}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          else {
              return Promise.reject(`Произошла ошибка: ${res.status}`);
          }
      });
};