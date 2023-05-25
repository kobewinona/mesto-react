import {useRef} from 'react';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
  const avatarInputRef = useRef();
  
  
  // handle submit
  
  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({avatar: avatarInputRef.current.value});
  }
  
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
        ref={avatarInputRef}
        id="profile-avatar-input"
        className="form__input form__input_type_profile-avatar"
        aria-label="Ссылка на изображение."
        type="url"
        name="userAvatar"
        placeholder="Ссылка на изображение"
        required
      />
      <span className="profile-avatar-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;