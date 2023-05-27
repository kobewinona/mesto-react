import Form from './Form';


function DeletePlacePopup(props) {
  function handleSubmit() {
    props.onDeletePlace(props.cardToDelete)
  }
  
  return(
    <Form
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