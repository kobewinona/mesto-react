import {memo, useCallback, useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


const EditProfilePopup = memo(props => {
  const currentUser = useContext(CurrentUserContext);
  
  const [inputValues, setInputValues] = useState({});
  
  
  const handleValuesUpdate = useCallback((name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues, [name]: value
    }));
  }, []);
  
  const handleSubmit = useCallback(() => {
    props.onUpdateUser({
      name: inputValues.userName,
      about: inputValues.userAbout
    });
  }, [props, inputValues.userName, inputValues.userAbout]);
  
  useEffect(() => {
    setInputValues({
      userName: currentUser.name,
      userAbout: currentUser.about
    })
  }, [currentUser]);
  
  
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText="Сохранить"
      onSubmit={handleSubmit}
      {...props}
    >
      <InputWithValidation
        isShown={props.isOpen}
        defaultValue={currentUser.name}
        onUpdate={handleValuesUpdate}
        name="userName"
        type="text"
        placeholder="Имя"
        aria-label="Имя."
        minLength="2"
        maxLength="40"
        required
      />
      <InputWithValidation
        isShown={props.isOpen}
        defaultValue={currentUser.about}
        onUpdate={handleValuesUpdate}
        name="userAbout"
        type="text"
        placeholder="Описание"
        aria-label="Деятельность."
        minLength="2"
        maxLength="200"
        required
      />
    </PopupWithForm>
  );
});

export default EditProfilePopup;