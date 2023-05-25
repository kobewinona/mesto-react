function PopupWithForm(props) {
  return (
    <section className={`popup popup_base_light ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_form ${props.isOpen ? 'grow' : 'shrink'}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть."
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button
            className="form__submit"
            aria-label={props.ariaLabel}
            type="submit"
            name="submit"
          >{props.submitText || 'Сохранить'}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;