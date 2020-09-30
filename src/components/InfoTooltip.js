import React from 'react';
import logoError from '../images/error.png';
import logoSuccess from '../images/success.png';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_active'}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                    <div className="infotooltip">
                        <img className="infotooltip__image" src={`${props.isLoggesIn ? logoSuccess :
                           logoError}`} alt="логотип">
                        </img>
                        <h3 className="infotooltip__title">
                            {`${props.isLoggesIn ? 'Вы успешно зарегестрировались!' :
                              'Что-то пошло не так! Попробуйте еще раз.'}`}
                        </h3>
                    </div>
            </div>
        </div>
    )
}

export default InfoTooltip;