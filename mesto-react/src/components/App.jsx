import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';


function App() {
  console.log('executed')
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }
  
  return (
    <>
      <Header/>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer/>
      <PopupWithForm
        title="Обновить аватар" name="edit-avatar"
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm
        title="Редактировать профиль" name="edit-profile"
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm
        title="Новое место" name="add-place"
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Уверены?" name="delete-place"/>
      <PopupWithImage/>
    </>
  );
}

export default App;
