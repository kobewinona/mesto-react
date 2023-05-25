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
      isOpen={props.isOpen}
      submitText={props.isLoading ? props.loadingText : 'Да'}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      ariaLabel="Да."
    />
  );
}

export default DeletePlacePopup;