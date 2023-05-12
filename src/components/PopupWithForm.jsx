function PopupWithForm(props) {
  return (
    <section className={`popup popup_base_light ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_form ${props.isOpen ? 'grow' : 'shrink'}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть."
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="form form_type_edit-avatar" name="edit-avatar" noValidate>
          <input
            id="profile-avatar-input"
            className="form__input form__input_type_profile-avatar"
            aria-label="Ссылка на изображение."
            type="url"
            name="userAvatar"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="profile-avatar-input-error form__input-error"></span>
          <button
            className="form__submit"
            aria-label="Сохранить."
            type="submit"
            name="submit"
          >{props.submitText || 'Сохранить'}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;