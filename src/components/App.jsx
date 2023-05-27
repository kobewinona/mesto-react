import React, {useState, useEffect} from 'react';

import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isCardPreviewPopupOpen, setIsCardPreviewPopupOpen] = useState(false);
  
  const [loadingText, setLoadingText] = useState('Сохранение');
  const [isLoading, setIsLoading] = useState(false);
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  
  
  // set initial current user info
  
  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err));
  }, [])
  
  
  // set initial cards
  
  useEffect(() => {
    api.getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => console.log(err));
  }, []);
  
  
  // handle popup
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  function handleDeletePlaceClick(card) {
    setCardToDelete(card);
    
    setIsDeletePlacePopupOpen(!isDeletePlacePopupOpen);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsCardPreviewPopupOpen(false);
    
    const cleanUp = () => setSelectedCard({});
    setTimeout(cleanUp, 200);
  }
  
  
  // handle cards
  
  function handleCardClick(card) {
    setIsCardPreviewPopupOpen(!isCardPreviewPopupOpen);
    
    setSelectedCard(card);
  }
  
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
  
    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }
  
  
  // render loading
  
  function renderLoading() {
    const renderer = () => {
      setLoadingText((l) => {
        return l.slice(-3) !== '...' ? l + '.' : l.slice(0, -3);
      });
    };
  
    return setInterval(renderer, 200);
  }
  
  function stopLoading(timerID) {
    setLoadingText('Сохранение');
    
    clearInterval(timerID);
  }
  
  
  // handle forms
  
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.patchUserAvatar(avatar)
      .then(res => setCurrentUser(res))
      .then(() => {
        setIsLoading(false)
        stopLoading(timerID)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }
  
  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.patchUserInfo(newUserInfo)
      .then(res => setCurrentUser(res))
      .then(() => {
        setIsLoading(false);
        stopLoading(timerID);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }
  
  function handleAddPlace(newCard) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.postCard(newCard)
      .then(card => setCards([card, ...cards]))
      .then(() => {
        setIsLoading(false);
        stopLoading(timerID);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  
  function handleDeletePlace(card) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter(c => c._id !== card._id)))
      .then(() => {
        setIsLoading(false);
        stopLoading(timerID);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLikeClick}
          onCardDeleteClick={handleDeletePlaceClick}
        />
        <Footer/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          loadingText={loadingText}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          loadingText={loadingText}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
          loadingText={loadingText}
          onClose={closeAllPopups}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onDeletePlace={handleDeletePlace}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
          loadingText={loadingText}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPreviewPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;