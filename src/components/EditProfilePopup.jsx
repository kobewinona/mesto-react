import {useState, useEffect, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import FormWithValidation from './FormWithValidation';
import InputWithValidation from './InputWithValidation';


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [inputValues, setInputValues] = useState({});
  
  
  // handle change
  
  function handleValuesUpdate(name, value) {
    setInputValues((prevValues) => ({
      ...prevValues, [name]: value
    }));
  }
  
  
  // handle submit
  
  function handleSubmit() {
    props.onUpdateUser({
      name: inputValues.userName,
      about: inputValues.userAbout
    });
  }
  
  
  // effects
  
  useEffect(() => {
    setInputValues({
      userName: currentUser.name,
      userAbout: currentUser.about
    })
  }, [currentUser]);
  
  
  return (
    <FormWithValidation
      title="Редактировать профиль"
      name="edit-profile"
      submitText={props.isLoading ? props.loadingText : 'Сохранить'}
      onSubmit={handleSubmit}
      ariaLabel="Сохранить."
      {...props}
    >
      <InputWithValidation
        className="form__input"
        aria-label="Имя."
        isShown={props.isOpen}
        defaultValue={currentUser.name}
        onUpdate={handleValuesUpdate}
        type="text"
        name="userName"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <InputWithValidation
        className="form__input"
        aria-label="Деятельность."
        isShown={props.isOpen}
        defaultValue={currentUser.about}
        onUpdate={handleValuesUpdate}
        type="text"
        name="userAbout"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
      />
    </FormWithValidation>
  );
}

export default EditProfilePopup;