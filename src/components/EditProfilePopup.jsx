import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [profileInfo, setProfileInfo] = useState({name: '', about: ''});
  
  
  // handle change
  
  function handleProfileInfoChange(event) {
    setProfileInfo({...profileInfo,
      [event.target.name]: event.target.value
    });
  }
  
  
  // handle submit
  
  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name: profileInfo.name,
      about: profileInfo.about
    });
  }
  
  
  // effects
  
  useEffect(() => {
    setProfileInfo({...profileInfo,
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser]);
  
  
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText={props.isLoading ? props.loadingText : 'Сохранить'}
      onSubmit={handleSubmit}
      ariaLabel="Сохранить."
      {...props}
    >
      <input
        id="profile-name-input"
        className="form__input form__input_type_profile-name"
        aria-label="Имя."
        onChange={handleProfileInfoChange}
        type="text"
        name="name"
        value={profileInfo.name || ''}
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
        onChange={handleProfileInfoChange}
        type="text"
        name="about"
        value={profileInfo.about || ''}
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