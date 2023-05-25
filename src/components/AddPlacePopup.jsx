import {useState, useRef} from 'react';

import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const linkInputRef = useRef();
  
  function handleChange(event) {
    setName(event.target.value);
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();
    
    props.onAddPlace({
      name,
      link: linkInputRef.current.value
    })
  
    setName('')
    linkInputRef.current.value = '';
  }
  
  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      submitText={props.isLoading ? props.loadingText : 'Создать'}
      onSubmit={handleSubmit}
      ariaLabel="Создать."
      {...props}
    >
      <input
        id="place-name-input"
        className="form__input form__input_type_place-name"
        aria-label="Название."
        onChange={handleChange}
        type="text"
        name="placeName"
        value={name}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="place-name-input-error form__input-error"></span>
      <input
        ref={linkInputRef}
        id="place-link-input"
        className="form__input form__input_type_place-link"
        aria-label="Ссылка на изображение."
        type="url"
        name="placeLink"
        placeholder="Ссылка на изображение"
        required
      />
      <span className="place-link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;