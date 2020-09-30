import { apiOption } from './utils';

export class Api {
    constructor(data) {
        this.apiUrl = data.apiUrl;
        this.headers = data.headers;
    }

    //метод отправки запроса
    _sendRequest(path, parameter) {
        return fetch(`${this.apiUrl}${path}`, parameter)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else if (!res.ok) {
                return Promise.reject(res.status);
            }
        })
    }

    //метод запроса информации о пользователе с сервера
    getUserInfo() {
        return this._sendRequest(`/users/me`, {
            headers: this.headers
        })
    }

    //метод отправки новой информации пользователя на сервер
    sendUserInfo(newUserInfo) {
        return this._sendRequest(`/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: newUserInfo.name,
                about: newUserInfo.about
            })
        })
    }

    //метод обновления аватара
    sendUserAvatar(avatar) {
        return this._sendRequest(`/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatar.avatar }),
            headers: this.headers
        })
    }

    //метод запроса карточек с сервера
    getCards() {
        return this._sendRequest(`/cards`, {
            method: 'GET',
            headers: this.headers
        })
    }

    //метод отправки новой карточки на сервер
    addCard(card) {
        return this._sendRequest(`/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: this.headers
        })
    }

    //метод добавляет или удаляет лайк
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this._sendRequest(`/cards/likes/${id}`, {
                method: 'PUT',
                headers: this.headers
            })
        } else {
            return this._sendRequest(`/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this.headers
            })
        }
    }

    //метод удаления карточки
    deleteCard(id, isOwn) {
        if (!isOwn) {
        return this._sendRequest(`/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
      }
    }
}

export const api = new Api(apiOption);