import {useState, useEffect} from 'react';

import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isCardPreviewPopupOpen, setIsCardPreviewPopupOpen] = useState(false);
  
  const [loadingText, setLoadingText] = useState('Сохранение');
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});
  
  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err));
  }, [])
  
  
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
  
  function handleCardClick(card) {
    setIsCardPreviewPopupOpen(!isCardPreviewPopupOpen);
    
    setSelectedCard(card);
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
  
  function handleCardLikeClick(card, setCards) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
  
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  
  
  // handle card delete
  
  function handleCardDeleteClick(card, setCards) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
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
  
  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.patchUserInfo(newUserInfo)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .then(() => {
        setIsLoading(false);
        stopLoading(timerID);
      })
      .catch((err) => console.log(err));
  }
  
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    const timerID = renderLoading();
    
    api.patchUserAvatar(avatar)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .then(() => {
        setIsLoading(false)
        stopLoading(timerID)
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLikeClick}
          onCardDeleteClick={handleCardDeleteClick}
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
        <PopupWithForm
          title="Уверены?"
          submitText="Да"
          isOpen={isDeletePlacePopupOpen}
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