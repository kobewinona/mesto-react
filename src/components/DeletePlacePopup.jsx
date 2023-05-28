import PopupWithForm from './PopupWithForm';


function DeletePlacePopup(props) {
  function handleSubmit(event) {
    event.preventDefault();
    
    props.onDeletePlace(props.cardToDelete)
  }
  
  return(
    <PopupWithForm
      title="Уверены?"
      name="delete-place"
      submitText="Да"
      onSubmit={handleSubmit}
      {...props}
    />
  );
}

export default DeletePlacePopup;