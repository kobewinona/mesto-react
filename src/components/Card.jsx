function Card({card, onCardClick}) {
  return (
    <li>
      <figure className="places__place grow">
        <button className="places__trash-button"
                type="button" aria-label="Удалить."></button>
        <img
          className="places__place-photo"
          src={card.link}
          alt={card.name}
          onClick={onCardClick}
        />
        <figcaption className="places__place-caption">
          <p className="places__place-name">{card.name}</p>
          <div className="places__like-container">
            <button className="places__like-button" type="button" aria-label="Нравится."></button>
            <p className="places__like-count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;