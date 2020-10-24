//идентификационные данные для работы с сервером
export const apiUrlAuth = 'https://api.elxnitis.students.nomoreparties.xyz';

const jwt = localStorage.getItem('jwt');

export const apiOption = {
    apiUrl: 'https://api.elxnitis.students.nomoreparties.xyz',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`
    }
}