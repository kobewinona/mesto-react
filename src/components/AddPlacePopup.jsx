import {useState} from 'react';

import FormWithValidation from './FormWithValidation';
import InputWithValidation from './InputWithValidation';


function AddPlacePopup(props) {
  const [inputValues, setInputValues] = useState({placeName: '', placeLink: ''});
  
  function handleValuesUpdate(name, value) {
    setInputValues((prevValues) => ({
      ...prevValues, [name]: value
    }));
  }
  
  
  function handleSubmit() {
    props.onAddPlace({
      name: inputValues.placeName,
      link: inputValues.placeLink
    })
  }
  
  return (
    <FormWithValidation
      title="Новое место"
      name="add-place"
      submitText={props.isLoading ? props.loadingText : 'Создать'}
      onSubmit={handleSubmit}
      ariaLabel="Создать."
      {...props}
    >
      <InputWithValidation
        className="form__input"
        aria-label="Название."
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        type="text"
        name="placeName"
        value={inputValues.name || ''}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <InputWithValidation
        className="form__input form__input_type_place-link"
        aria-label="Ссылка на изображение."
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        type="url"
        name="placeLink"
        value={inputValues.link || ''}
        placeholder="Ссылка на изображение"
        required
      />
      <span className="place-link-input-error form__input-error"></span>
    </FormWithValidation>
  );
}

export default AddPlacePopup;