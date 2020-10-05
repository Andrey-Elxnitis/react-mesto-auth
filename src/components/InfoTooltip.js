import React from 'react';
import logoError from '../images/error.png';
import logoSuccess from '../images/success.png';

function InfoTooltip(props) {

  const {
    isOpen,
    onClose,
    isError
  } = props

  // функция отвечает за показ текста ошибки или успешной операции
  const textError =  (
     `${isError ? 'Вы успешно зарегестрировались!' :'Что-то пошло не так! Попробуйте еще раз.'}`
  )

  // какой логотип показать (ошибка или успешная операция)
  const imageError = (`${isError ? logoSuccess : logoError}`)

    return (
        <div className={`popup ${isOpen && 'popup_active'}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={onClose} type="button"></button>
                    <div className="infotooltip">
                        <img className="infotooltip__image" src={imageError} alt="логотип"></img>
                        <h3 className="infotooltip__title">{textError}</h3>
                    </div>
            </div>
        </div>
    )
}

export default InfoTooltip;