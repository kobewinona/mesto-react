function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="mesto-react/index#" alt="Аватар."/>
          <button
            className="profile__edit-avatar-button"
            onClick={props.onEditAvatar}>
          </button>
        </div>
        <div className="profile__container">
          <h1 className="profile__name"></h1>
          <button
            className="profile__edit-profile-button"
            type="button"
            aria-label="Редактировать профиль."
            onClick={props.onEditProfile}>
          </button>
          <p className="profile__job"></p>
        </div>
        <button
          className="profile__add-place-button"
          type="button"
          aria-label="Добавить фотографию места."
          onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="places" aria-label="Секция с фотографиями мест России.">
        <ul className="places__list"></ul>
      </section>
    </main>
  );
}

export default Main;