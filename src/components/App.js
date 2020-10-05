import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { register, authorize, saveToken } from '../utils/Auth.js'
import { CurrentUserContext } from '../contexts/CurrentUserContex.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import '../index.css';

function App() {

  //стейт переменная принимает данные пользователя
  const [currentUser, setCurrenUser] = useState({});

  //стейт-переменные попапов в значении false
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: ''
  });

  // история для переброски пользователя
  const history = useHistory();

  //стейт переменная для хранения email пользователя
  const [user, setUser] = useState('');

  //стейт-переменная для отображения "сохранение..."
  const [isLoading, setIsLoading] = useState(false);

  // стейт переменная для попапа (ошибка или успешная регистрация)
  const [error, setError] = useState(false);

  // состояние пользователя авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Закрытие попапов при клике на Esc и на overlay
  React.useEffect(() => {

    // закрытие попапа при клике на Esc
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    // закрытие попапа при клике на overlay
    function closeOverlay(event) {
      if (event.target.classList.contains('popup_active')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeOverlay);
    }
  });

  //запрашиваем данные пользователя с сервера
  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrenUser(data);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
  }, []);

  //функция обновляет данные пользователя
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.sendUserInfo(data)
    .then((data) => {
      setCurrenUser(data);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      setIsLoading(false);
      closeAllPopups();
    })
  }

  //функция отвечает за изменение аватара пользователя
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.sendUserAvatar(data)
    .then((data) => {
      setCurrenUser(data);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      setIsLoading(false);
      closeAllPopups();
    })
  }

  //пустой массив для карточек
  const [cards, setCards] = useState([]);

  //запрашиваем массив карточек с сервера
  React.useEffect(() => {
    api.getCards()
    .then((data) => {
      setCards(data);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
  }, []);

  //функция отправки новой карточки на сервер
  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addCard(data)
    .then((data) => {
      setCards([...cards, data]);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
    .finally(() => {
      setIsLoading(false);
      closeAllPopups();
    })
  }

  //функция отрисовки лайка
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос на сервер и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
  }

  //функция удаления карточки
  function handleCardDelete(card) {
    //проверяем карточку, добавлена ли она текущем пользователем
    const isOwn = card.owner._id === currentUser._id;
    
    // Отправляем запрос на сервер и получаем обновлённые данные карточки
    api.deleteCard(card._id, !isOwn)
    .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
}

  //функция открытия попапа фото
  function handleCardClick(cardData) {
    const { link, name } = cardData;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }

  //функция открытия попапа аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  //функция открытия попапа профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  //функция открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  //функция закрытия попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard((setSelectedCard) => {
      return {...setSelectedCard, isImageOpen: false}
    });
  }

  // сохраняем токен в локальном хранилище
  const tokenSave = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      saveToken(jwt)
      .then((res) => {
        if (res) {
          setUser(res.data.email)
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenSave();
  },[]);

  // функция отвечает за авторизацию пользователя
  function updateLogin() {
    setLoggedIn(true);
  }

  // функция отвечает за показ модального окна при регистрации
  function updateInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  
  // функция отвечает за выход пользователя из прилажения
  function exitAuth() {
    localStorage.removeItem('jwt');
    setUser('')
    setLoggedIn(false);
    history.push('/sign-in');
  }
  
  // функция отвечает за авторизацию пользователя
  function entranceLogin(email, password, setEmail, setPassword) {
    authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setUser(email);
      setEmail('');
      setPassword('');
      updateLogin();
      history.push('/')
    })
    .catch((err) => {
      setError(false)
      updateInfoTooltip();
      console.log(err);
    });
  } 

  // функция отвечает за регистрацию пользователя
  function registerUser(email, password) {
    register(email, password)
    .then((res) => {
      if (res) {
        history.push('/');
        setError(true);
        updateInfoTooltip();
      }
    })
    .catch((err) => {
      setError(false);
      updateInfoTooltip();
      console.log(err);
    });
  }

  //возвращаем разметку страницы, которую добавляем в DOM
  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className="page">

    <Header onSignOut={exitAuth} user={user} />
    
    <Switch>
      <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards} />
      <Route path="/sign-up">
        <Register onSignup={registerUser} />
      </Route>  
      <Route path="/sign-in">
        <Login onLogin={entranceLogin} />
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
      </Route>
    </Switch>

    <Footer />

    <section className="popups">

     <EditProfilePopup
       isOpen={isEditProfilePopupOpen}
       onClose={closeAllPopups}
       onUpdateUser={handleUpdateUser}
       isLoading={isLoading}
     >
     </EditProfilePopup>

    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      isLoading={isLoading}
    >
    </AddPlacePopup>

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      isLoading={isLoading}
    >
    </EditAvatarPopup>

    <ImagePopup
      isOpen={selectedCard.isImageOpen}
      onClose={closeAllPopups}
      name={selectedCard.name}
      link={selectedCard.link}
    >
    </ImagePopup>

    <InfoTooltip
      isOpen={isInfoTooltipOpen}
      onClose={closeAllPopups}
      isError={error}
    >
    </InfoTooltip>  

    <PopupWithForm
      name='card-delete'
      title='Вы уверены?'
      buttonText='Да'
    >
    </PopupWithForm>
    </section>
  </div>

  </CurrentUserContext.Provider>
  );
}

export default App;
