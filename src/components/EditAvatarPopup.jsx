import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [avatar, setAvatar] = useState('');
  
  
  // handle change
  
  function handleAvatarChange(event) {
    setAvatar(event.target.value);
  }
  
  
  // handle submit
  
  function handleSubmit(event) {
    event.preventDefault();
    
    props.onUpdateAvatar({avatar});
  }
  
  
  // effects
  
  useEffect(() => {
    setAvatar(currentUser.avatar)
    setAvatar('')
  }, [currentUser]);
  
  
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen}
      submitText={props.isLoading ? props.loadingText : 'Сохранить'}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      ariaLabel="Сохранить."
    >
      <input
        id="profile-avatar-input"
        className="form__input form__input_type_profile-avatar"
        aria-label="Ссылка на изображение."
        onChange={handleAvatarChange}
        type="url"
        name="userAvatar"
        value={avatar || ''}
        placeholder="Ссылка на изображение"
        required
      />
      <span className="profile-avatar-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;