import React from 'react';
import api from '../utils/Api';
import Card from './Card';


function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState('');
  const [isAvatarLoaded, setIsAvatarLoaded] = React.useState(false);
  
  const [userName, setUserName] = React.useState('');
  const [userJob, setUserJob] = React.useState('');
  const [userID, setUserID] = React.useState('');
  
  const [initialCards, setInitialCards] = React.useState([]);
  
  
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{avatar, name, about, _id}, initialCards]) => {
        setUserAvatar(avatar);
        setIsAvatarLoaded(!isAvatarLoaded);
        
        setUserName(name);
        setUserJob(about);
        setUserID(_id);
        
        setInitialCards(initialCards);
      }).catch(err => console.log(err));
  }, [])
  
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className={`profile__avatar ${isAvatarLoaded && 'profile__avatar_displayed'}`}
            src={userAvatar} alt="Аватар."/>
          <button
            className="profile__edit-avatar-button"
            onClick={props.onEditAvatar}>
          </button>
        </div>
        <div className="profile__container">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-profile-button"
            type="button"
            aria-label="Редактировать профиль."
            onClick={props.onEditProfile}>
          </button>
          <p className="profile__job">{userJob}</p>
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
          {initialCards.map((card) => {
            return <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              isOwner={card.owner._id === userID && true}/>;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;