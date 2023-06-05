import {memo, useCallback, useRef, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


const EditAvatarPopup = memo(props => {
  const avatarInputRef = useRef();
  
  const [inputValue, setInputValue] = useState({});
  
  const handleValueUpdate = useCallback((name, value) => {
    setInputValue({[name]: value});
  }, []);
  
  const handleSubmit = useCallback(() => {
    props.onUpdateAvatar({avatar: inputValue.userAvatar});
  
    avatarInputRef.current.value = '';
  }, [props, inputValue.userAvatar]);
  
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
});

export default EditAvatarPopup;