function ImagePopup({card, isOpen, onClose}) {
  return (
    <section
      className={`popup popup_base_dark ${isOpen && 'popup_opened'}`}
      aria-label="Окно просмотра фотографии."
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_type_preview ${isOpen ? 'grow' : 'shrink'}`}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть."
          onClick={onClose}
        ></button>
        <figure className="popup__preview-element">
          <img
            className="popup__preview-photo"
            src={card?.link}
            alt={card.name}
          />
          <figcaption>
            <p className="popup__preview-cap">{card.name}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;