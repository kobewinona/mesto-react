import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
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
      <template id="card">
        <li>
          <figure className="places__place grow">
            <button className="places__trash-button" type="button" aria-label="Удалить."></button>
            <img
              className="places__place-photo"
              src="#"
              alt=""
            />
            <figcaption className="places__place-caption">
              <p className="places__place-name"></p>
              <div className="places__like-container">
                <button className="places__like-button" type="button" aria-label="Нравится."></button>
                <p className="places__like-count">0</p>
              </div>
            </figcaption>
          </figure>
        </li>
      </template>
    </>
  );
}

export default App;
