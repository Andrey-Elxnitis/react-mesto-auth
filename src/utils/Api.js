import { apiOption} from './utils';

export class Api {
    constructor(data) {
        this.apiUrl = data.apiUrl;
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
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    //метод отправки новой информации пользователя на сервер
    sendUserInfo(newUserInfo) {
        return this._sendRequest(`/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
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
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    //метод запроса карточек с сервера
    getCards() {
        return this._sendRequest(`/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
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
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            } 
        })
    }

    //метод добавляет или удаляет лайк
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this._sendRequest(`/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
        } else {
            return this._sendRequest(`/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
        }
    }

    //метод удаления карточки
    deleteCard(id, isOwn) {
        if (!isOwn) {
        return this._sendRequest(`/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
      }
    }
}

export const api = new Api(apiOption);