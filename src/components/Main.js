import React from 'react';
import avatar from '../images/avatar.png';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContex.js';

function Main(props) {

  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete
  } = props

  //подписались на контекст с данными пользователя
  const currentUser = React.useContext(CurrentUserContext);

    //возвращаем разметку контента страницы
    return (
        <main className="content">
        <section className="profile">
          <div className="profile__image">
          <img className="profile__avatar" src={currentUser.avatar || avatar} alt="аватар"/>
          <button onClick={onEditAvatar} className="profile__avatar-edit"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
         <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            >
            </Card>
          ))}
        </section>
      </main>
    );
}

export default Main;