import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContex.js';

function EditProfilePopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateUser,
        isLoading
    } = props

    //подписка на контекст с данными пользователя
    const currentUser = React.useContext(CurrentUserContext);

    //данные пользователя: имя, о себе.
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //функция отслеживает изменение имени пользователя
    function handleNameUpdate(e) {
        setName(e.target.value);
    }

    //функция отслеживает изменение поля о себе у пользователя
    function handleDescription(e) {
        setDescription(e.target.value);
    }

    //функция отвечает за обновление данных пользователя
    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name: name,
          about: description,
        });
      }

    //после закгрузки данных пользователя с сервера используем их по умолчанию 
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);
    

    return (
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <fieldset
            className="popup__inputs"
          >
          <input
            value={name || ''}
            className="popup__input popup__input_name"
            id="name-input"
            type="text"
            required
            minLength={2}
            maxLength={40}
            pattern="[A-Za-zА-ЯЁа-яё -]{1,}" 
            placeholder="Ваше имя"
            onChange={handleNameUpdate}
          />
          <span
            className="popup__error-message"
            id="name-input-error">
          </span>
          <input
            value={description || ''}
            className="popup__input popup__input_text"
            id="text-input"
            type="text"
            required
            minLength={2}
            maxLength={40}
            placeholder="О себе"
            onChange={handleDescription}
          />
          <span
            className="popup__error-message"
            id="text-input-error">
          </span>
          </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;