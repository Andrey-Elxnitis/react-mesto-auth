import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContex.js';

function Card(props) {

    const {
      card,
      onCardClick,
      onCardLike,
      onCardDelete
    } = props

    //подписались на контекст с данными пользователя
    const currentUser = React.useContext(CurrentUserContext);

    //проверяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    //создаем переменную, которую после зададим в 'className' для кнопки удаления карточки
    const cardDeleteButtonClassName = (
      `element__delete ${isOwn ? 'element__delete_active' : ''}`
    );

    //проверяем, есть ли у карточки лайк, поставленный текущем пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //создаем переменную, которую после зададим в 'className' для отображения лайка
    const cardLikeButtonClassName = (
      `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    //функция отвечает за вызов функции открытия попапа фото
    function handleImageClick() {
      onCardClick(card);
    }

    //функция отвечает за постановку лайка
    function handleLikeClick() {
      onCardLike(card);
    }

    //функция отвечает за удаление карточки
    function handleDeleteClick() {
      onCardDelete(card);
    }

    //возвращаем готовую карточку
    return (
        <div className="element">
          <img
            className="element__image"
            alt="изображение"
            src={card.link}
            onClick={handleImageClick}
          />
          <button
            className={`${cardDeleteButtonClassName}`}
            onClick={handleDeleteClick}
            type="button">
          </button>
          <div
            className="element__text"
          >
          <h2
            className="element__title"
          >
            {card.name}
          </h2>
          <div
            className="element__interactivity"
          >
          <button
            type="button"
            className={`${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          >
          </button>
          <span
            className="element__like-counter"
          >
            {card.likes.length}
          </span>
          </div>
          </div>
        </div>
    )
}

export default Card;