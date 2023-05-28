import React, {useState, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Card from './Card';


function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  
  function handleAvatarLoad() {
    setIsAvatarLoaded(true);
  }
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className={`profile__avatar ${isAvatarLoaded && 'profile__avatar_displayed'}`}
            src={currentUser.avatar} alt="Аватар." onLoad={handleAvatarLoad}/>
          <button
            className="profile__edit-avatar-button"
            onClick={props.onEditAvatar}>
          </button>
        </div>
        <div className="profile__container">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-profile-button"
            type="button"
            aria-label="Редактировать профиль."
            onClick={props.onEditProfile}>
          </button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-place-button"
          type="button"
          aria-label="Добавить фотографию места."
          onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="places" aria-label="Секция с фотографиями мест России.">
        <ul className="places__list">
          {props.cards.map(card => {
            return <Card
              key={card._id}
              card={card}
              onCardClick={() => props.onCardClick(card)}
              onCardLikeClick={() => props.onCardLikeClick(card)}
              onCardDeleteClick={() => props.onCardDeleteClick(card)}
            />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;