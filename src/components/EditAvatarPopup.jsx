import React, {useRef, useState} from 'react';

import FormWithValidation from './FormWithValidation';
import InputWithValidation from './InputWithValidation';


function EditAvatarPopup(props) {
  const avatarInputRef = useRef();
  
  const [inputValue, setInputValue] = useState({});
  
  
  // handle change
  
  function handleValueUpdate(name, value) {
    setInputValue({[name]: value});
  }
  
  
  // handle submit
  
  function handleSubmit() {
    props.onUpdateAvatar({avatar: inputValue.userAvatar});
  
    avatarInputRef.current.value = '';
  }
  
  return (
    <FormWithValidation
      title="Обновить аватар"
      name="edit-avatar"
      submitText={props.isLoading ? props.loadingText : 'Сохранить'}
      onSubmit={handleSubmit}
      ariaLabel="Сохранить."
      {...props}
    >
      <InputWithValidation
        ref={avatarInputRef}
        className="form__input"
        aria-label="Ссылка на изображение."
        isShown={props.isOpen}
        type="url"
        onUpdate={handleValueUpdate}
        name="userAvatar"
        placeholder="Ссылка на изображение"
        required
      />
      <span className="profile-avatar-input-error form__input-error"></span>
    </FormWithValidation>
  );
}

export default EditAvatarPopup;