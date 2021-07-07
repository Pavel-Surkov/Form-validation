import React, { useState, useEffect } from 'react';

export const Validation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const [formValid, setFormValid] = useState(false);

  const blurHandler = event => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(true);
      case 'password':
        setPasswordDirty(true);
      break;
    }
  }

  const focusHandler = event => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(false);
        break;
      case 'password':
        setPasswordDirty(false);
        break;
    }
  }

  const emailHandler = event => {
    const value = event.target.value;
    setEmail(value);

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(value).toLowerCase())) {
      value.length === 0 ? 
        setEmailError('Email cannot be empty') : 
        setEmailError('Email is incorrect');
    } else {
      setEmailError('');
    }
  }

  const passwordHandler = event => {
    const value = event.target.value;
    setPassword(event.target.value);

    if(value.length < 5 || value.length > 12) {
      value.length === 0 ? 
        setPasswordError('Password cannot be empty') : 
        setPasswordError('Password is incorrect');
    } else {
      setPasswordError('');
    }
  }

  useEffect(() => {
    if(emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError])
  
  return (
    <form>
      <h1>Registration</h1>
      {(emailDirty && emailError) && <p style={{color: 'red'}}>{emailError}</p>}
      <input 
        onFocus={focusHandler}
        value={email}      
        onChange={emailHandler}
        onBlur={blurHandler} 
        name="email" 
        type="text" 
        placeholder="Enter your email..." />
      <br/>
      {(passwordDirty && passwordError) && <p style={{color: 'red'}}>{passwordError}</p>}
      <input 
        onFocus={focusHandler}
        value={password}
        onChange={passwordHandler}
        onBlur={blurHandler} 
        name="password" 
        type="pasword" 
        placeholder="Enter your password..." />
      <br/>
      <button type="submit" disabled={!formValid}>Registration</button>
    </form>
  );
}