import {memo, useCallback} from 'react';

import PopupWithForm from './PopupWithForm';


const DeletePlacePopup = memo(props => {
  const handleSubmit = useCallback(event => {
    event.preventDefault();
    
    props.onDeletePlace(props.cardToDelete)
  }, [props]);
  
  return(
    <PopupWithForm
      title="Уверены?"
      name="delete-place"
      submitText="Да"
      onSubmit={handleSubmit}
      {...props}
    />
  );
});

export default DeletePlacePopup;