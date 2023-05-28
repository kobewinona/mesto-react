import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [inputValues, setInputValues] = useState({});
  
  
  function handleValuesUpdate(name, value) {
    setInputValues((prevValues) => ({
      ...prevValues, [name]: value
    }));
  }
  
  function handleSubmit() {
    props.onUpdateUser({
      name: inputValues.userName,
      about: inputValues.userAbout
    });
  }
  
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
}

export default EditProfilePopup;