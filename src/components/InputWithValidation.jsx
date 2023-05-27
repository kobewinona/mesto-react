import React, {useState, useEffect} from 'react';

const InputWithValidation = React.forwardRef(({name, onUpdate, isShown, ...props}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setInputValue(props.defaultValue);
    setIsInputValid(true);
    setErrorMessage('');
  }, [isShown]);
  
  function handleInputsChange(event) {
    setInputValue(event.target.value);
    setIsInputValid(event.target.validity.valid);
    setErrorMessage(event.target.validationMessage);
    
    onUpdate(name, event.target.value);
  }
  
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={`form__input ${!isInputValid && 'form__input_error'}`}
        onChange={handleInputsChange}
        value={inputValue || ''}
        name={name}
      />
      <span className="form__input-error">{!isInputValid && errorMessage}</span>
    </>
  );
})

export default InputWithValidation;