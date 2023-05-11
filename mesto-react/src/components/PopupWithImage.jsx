function PopupWithImage() {
  return (
    <section className="popup popup_type_place-preview" aria-label="Окно просмотра фотографии.">
      <div className="popup__container popup__container_type_preview">
        <button className="popup__close-button" type="button" aria-label="Закрыть."></button>
        <figure className="popup__preview-element">
          <img
            className="popup__preview-photo"
            src="mesto-react/index#"
            alt=""
          />
          <figcaption>
            <p className="popup__preview-cap"></p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default PopupWithImage;