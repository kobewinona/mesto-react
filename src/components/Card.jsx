import {useState, useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card({card, onCardClick, onCardLikeClick, onCardDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);
  
  const [isPlaceLoaded, setIsPlaceLoaded] = useState(false);
  
  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  
  function handlePlaceLoad() {
    setIsPlaceLoaded(true);
  }
  
  return (
    <li>
      <figure className="places__place grow">
        {isOwner && <button
          className="places__trash-button"
          type="button"
          aria-label="Удалить."
          onClick={onCardDeleteClick}
        />}
        <div className="places__place-substrate">
          <img
            className={`places__place-photo ${isPlaceLoaded && 'places__place-photo_displayed'}`}
            src={card.link}
            alt={card.name}
            onClick={onCardClick}
            onLoad={handlePlaceLoad}
          />
        </div>
        <figcaption className="places__place-caption">
          <p className="places__place-name">{card.name}</p>
          <div className="places__like-container">
            <button className={`places__like-button ${isLiked && 'places__like-button_active'}`}
                    type="button" aria-label="Нравится." onClick={onCardLikeClick}/>
            <p className="places__like-count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;