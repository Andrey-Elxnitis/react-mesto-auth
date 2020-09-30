import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateAvatar,
        isLoading
    } = props

    //с помощью рефа получаем напрямую доступ к аватарки пользователя
    const inputAvatar = React.useRef('');

    //сбрасываем значение инпута при повторном открытие попапа
    React.useEffect(() => {
        inputAvatar.current.value = '';
    }, [isOpen]);

    //функция отвечает за отправку нового аватара
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatar.current.value
        })
    }

    return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
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
        name="avatar"
        className="popup__input popup__input_avatar"
        id="avatar-link"
        type="url"
        placeholder="Загрузите изображение"
        defaultValue=""
        required
        ref={inputAvatar}
      />
      <span
        className="popup__error-message"
        id="avatar-link-error">
      </span>
      </fieldset>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;