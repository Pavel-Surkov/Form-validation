import React, { useState, useEffect } from 'react';

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = e => {
    setValue(e.target.value);
  }

  const onBlur = e => {
    setDirty(true);
  }

  return {
    value,
    onChange,
    onBlur,
    ...valid,
    isDirty
  }
}

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for(let validation in validations) {
      switch (validation) {
        case 'minLength': 
          value.length < validations[validation] 
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'isEmpty': 
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'maxLength':
          value.length > validations[validation] 
          ? setMaxLengthError(true)
          : setMaxLengthError(false);
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true);
          break;
      }
    }
  }, [value])

  useEffect(() => {
    if(isEmpty || minLengthError || maxLengthError || isEmail) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, isEmail])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmail,
    inputValid
  }
}

export const CustomValidation = () => {
  const email = useInput('', { isEmpty: true, minLength: 4, isEmail: true, });
  const password = useInput('', { isEmpty: true, minLength: 6, maxLength: 10, });

  const validationCases = {
    isEmpty: 'The field cannot be empty',
    minLengthError: 'Length is too small',
    maxLengthError: 'Length is too long',
    isEmail: 'Uncorrect email',
  };

  const validationId = Array.from(Object.keys(validationCases));
  
  return (
    <div className="app">
      <form>
        <h1>Registration</h1>
        {validationId.map(rule => {
          return (
            (email.isDirty && email[rule] && rule !== 'maxLengthError')
            && <p style={{color: 'red'}} key={rule}>{validationCases[rule]}</p>
          );
        })}
        <input
          onChange={ e => email.onChange(e) } onBlur={ e => email.onBlur(e) } 
          name="email" 
          type="text" 
          placeholder="Enter your email..." />
        {validationId.map(rule => {
          return (
            (password.isDirty && password[rule] && rule !== 'isEmail')
            && <p style={{color: 'red'}} key={rule}>{validationCases[rule]}</p>
          );
        })}
        <input 
          onChange={ e => password.onChange(e) } onBlur={ e => password.onBlur(e) } 
          name="password" 
          type="password" 
          placeholder="Enter your password..." />
        <button disabled={!email.inputValid || !password.inputValid} type="submit">
          Registration
        </button>
      </form>
    </div> 
  );
}