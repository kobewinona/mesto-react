import React, {useRef} from 'react';

import FormWithValidation from './FormWithValidation';
import Spinner from './Spinner';


const PopupWithForm = React.memo((props) => {
  const submitButtonRef = useRef();

  if (!props.validate && props.isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <section className={`popup popup_base_light ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_form ${props.isOpen ? 'grow' : 'shrink'}`}>
        <button
          className="popup__close-button" type="button" aria-label="Закрыть." onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        {props.validate
          ? <FormWithValidation onSubmit={props.onSubmit} {...props}>
            {props.children}
          </FormWithValidation>
          : <form
            className="form"
            name={props.name}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.isLoading
              ? <Spinner />
              : <button
                ref={submitButtonRef}
                className="form__submit"
                type="submit"
                name="submit"
                autoFocus
              >{props.submitText || 'Сохранить'}</button>}
          </form>
        }
        
      </div>
    </section>
  );
})

export default PopupWithForm;