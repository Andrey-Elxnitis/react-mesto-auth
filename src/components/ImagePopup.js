import React from 'react';

function ImagePopup(props) {

  const {
    isOpen,
    onClose,
    name,
    link,
  } = props

    //возвращаем разметку попапа фото
    return (
        <div className={`popup popup_type_photo ${isOpen && 'popup_active'}`}>
          <div className="popup__card">
          <button
            onClick={onClose}
            type="button"
            className="popup__close-button popup__close-button_photo">
          </button>
          <img
            className="popup__card-image"
            alt={name}
            src={link}
          />
          <p className="popup__card-name">{name}</p>
          </div>
        </div>
    );
}

export default ImagePopup;