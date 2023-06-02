import React, {useState, useEffect} from 'react';

import Spinner from './Spinner';


const FormWithValidation = React.memo((props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});
  
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
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (event.target.checkValidity()) {
      props.onSubmit();
    }
    
    setIsFormValid(false);
  }

  useEffect(() => {
    validateForm();
  
    // eslint-disable-next-line
  }, [inputsValidity])
  
  useEffect(() => {
    setInputsValidity({});
  }, [props.isOpen])
  
  return (
    <form
      className="form"
      name={props.name}
      onChange={handleChange}
      onSubmit={handleSubmit}
      noValidate
    >
      {props.children}
      {props.isLoading
        ? <Spinner />
        : <button
          className={`form__submit ${!isFormValid && 'form__submit_disabled'}`}
          type="submit"
          name="submit"
          disabled={!isFormValid}
        >{props.submitText || 'Сохранить'}</button>}
    </form>
  )
})

export default FormWithValidation;