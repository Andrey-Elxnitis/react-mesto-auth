import React from 'react';

function PopupWithForm(props) {

    const {
        title,
        name,
        children,
        buttonText,
        isOpen,
        onClose,
        onSubmit,
        isLoading
    } = props;

    //возвращаем общую разметку попапов
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_active'}`}>
            <form
            onSubmit={onSubmit}
            className={`popup__container popup__container_type_${name}`}>
            <button onClick={onClose} type="button"
            className="popup__close-button"></button>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button type="submit" className="popup__button">{isLoading ? `Сохранение...` : buttonText}</button>
            </form>
        </div>
    );
}

export default PopupWithForm;