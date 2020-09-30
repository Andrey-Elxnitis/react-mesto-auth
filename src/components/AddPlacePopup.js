import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {

    const {
        isOpen,
        onClose,
        onAddPlace,
        isLoading
    } = props;

    //рефы: имя карточки, ссылка карточки.
    const inputName = React.useRef('');
    const inputLink = React.useRef('');

    //сбрасываем значения инпутов при открытии попапа
    React.useEffect(() => {
        inputName.current.value = '';
        inputLink.current.value = '';
    }, [isOpen]);

    //функция отвечает за отправку данных карточки
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: inputName.current.value,
            link: inputLink.current.value
        });
    }

    return(
      <PopupWithForm
        name="card"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
      <fieldset className="popup__inputs">
          <input
            name="name"
            className="popup__input popup__input_title"
            id="title-input"
            type="text"
            placeholder="Название"
            defaultValue=""
            required
            minLength={1}
            maxLength={30}
            ref={inputName}
          />
          <span
            className="popup__error-message"
            id="title-input-error">
          </span>
          <input
            name="link"
            className="popup__input popup__input_link"
            id="link-input"
            type="url"
            placeholder="Ссылка на картинку"
            defaultValue=""
            required
            ref={inputLink}
          />
          <span
            className="popup__error-message"
            id="link-input-error">
          </span>
      </fieldset>
      </PopupWithForm>
    )
}

export default AddPlacePopup;