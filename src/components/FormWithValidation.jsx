import {useState, useEffect} from 'react';


function FormWithValidation(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (event.target.checkValidity()) {
      props.onSubmit();
    }
    
    setIsFormValid(false);
  }
  //
  function handleChange(event) {
    const inputs = Array.from(event.currentTarget.elements);
    
    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});
    
    setInputsValidity(currentInputsValidity);
  }
  
  function validateForm() {
    const inputValues = Object.values(inputsValidity);

    if (inputValues.length === 0) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(inputValues.every((i) => i === true));
  }

  useEffect(() => {
    validateForm();
  }, [inputsValidity, props.isOpen])
  
  useEffect(() => {
    setInputsValidity({});
  }, [props.isOpen])
  
  return (
    <section className={`popup popup_base_light ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_form ${props.isOpen ? 'grow' : 'shrink'}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть."
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} onChange={handleChange} onSubmit={handleSubmit} noValidate>
          {props.children}
          <button
            className={`form__submit ${!isFormValid && 'form__submit_disabled'}`}
            aria-label={props.ariaLabel}
            type="submit"
            name="submit"
            disabled={!isFormValid}
          >{props.submitText || 'Сохранить'}</button>
        </form>
      </div>
    </section>
  );
}

export default FormWithValidation;