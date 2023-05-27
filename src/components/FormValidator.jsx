function FormValidator(props) {
  function handleSubmit(event) {
    event.preventDefault();
    
    if (event.target.checkValidity()) {
      props.onSubmit();
    }
  }
  
  return (
    <form className="form" name={props.name} onSubmit={handleSubmit} noValidate>
      {props.children}
    </form>
  );
}

export default FormValidator;