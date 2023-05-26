import {useState} from 'react';

import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
  const [placeInfo, setPlaceInfo] = useState({name: '', link: ''});
  
  function handlePlaceInfoChange(event) {
    setPlaceInfo({...placeInfo,
      [event.target.name]: event.target.value
    });
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name: placeInfo.name,
      link: placeInfo.link
    })

    setPlaceInfo({name: '', link: ''})
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
        onChange={handlePlaceInfoChange}
        type="text"
        name="name"
        value={placeInfo.name || ''}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="place-name-input-error form__input-error"></span>
      <input
        id="place-link-input"
        className="form__input form__input_type_place-link"
        aria-label="Ссылка на изображение."
        onChange={handlePlaceInfoChange}
        type="url"
        value={placeInfo.link || ''}
        name="link"
        placeholder="Ссылка на изображение"
        required
      />
      <span className="place-link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;