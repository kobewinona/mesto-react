import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  
  
  // handle change
  
  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handleAboutChange(event) {
    setAbout(event.target.value);
  }
  
  
  // handle submit
  
  function handleSubmit(event) {
    event.preventDefault();
    
    props.onUpdateUser({name, about});
  }
  
  
  // effects
  
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);
  
  
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      submitText={props.isLoading ? props.loadingText : 'Сохранить'}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      ariaLabel="Сохранить."
    >
      <input
        id="profile-name-input"
        className="form__input form__input_type_profile-name"
        aria-label="Имя."
        onChange={handleNameChange}
        type="text"
        name="userName"
        value={name || ''}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="profile-name-input-error form__input-error"></span>
      <input
        id="profile-about-input"
        className="form__input form__input_type_profile-about"
        aria-label="Деятельность."
        onChange={handleAboutChange}
        type="text"
        name="userAbout"
        value={about || ''}
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profile-about-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;