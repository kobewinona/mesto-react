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
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  
  
  // set initial current user info and initial cards
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      }).catch(err => console.log(err));
  }, [])
  
  
  // handle popup
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleDeletePlaceClick(card) {
    setCardToDelete(card);
    
    setIsDeletePlacePopupOpen(true);
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
      .then(newCard => setCards(cards.map(c => c._id === card._id ? newCard : c)))
      .catch(err => console.log(err));
  }
  
  
  // handle forms
  
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    
    api.patchUserAvatar(avatar)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    
    api.patchUserInfo(newUserInfo)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleAddPlace(newCard) {
    setIsLoading(true);
    
    api.postCard(newCard)
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleDeletePlace(card) {
    setIsLoading(true);
    
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter(c => c._id !== card._id)))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
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
          onClose={closeAllPopups}
          validate={true}
          
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onClose={closeAllPopups}
          validate={true}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
          onClose={closeAllPopups}
          validate={true}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onDeletePlace={handleDeletePlace}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
          onClose={closeAllPopups}
          validate={false}
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