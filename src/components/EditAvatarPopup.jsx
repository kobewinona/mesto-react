import React, {useRef, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


function EditAvatarPopup(props) {
  const avatarInputRef = useRef();
  
  const [inputValue, setInputValue] = useState({});
  
  function handleValueUpdate(name, value) {
    setInputValue({[name]: value});
  }
  
  function handleSubmit() {
    props.onUpdateAvatar({avatar: inputValue.userAvatar});
  
    avatarInputRef.current.value = '';
  }
  
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      submitText="Сохранить"
      onSubmit={handleSubmit}
      {...props}
    >
      <InputWithValidation
        ref={avatarInputRef}
        isShown={props.isOpen}
        onUpdate={handleValueUpdate}
        name="userAvatar"
        type="url"
        placeholder="Ссылка на изображение"
        aria-label="Ссылка на изображение."
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;