import React = require('react');
import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  // const [emailValid, setEmailValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'firstName') {
      setFirstName(value);
    }
    if (id === 'lastName') {
      setLastName(value);
    }
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
      setPasswordValid(value === confirmPassword);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordValid(password === value);
    }
  };

  const handleSubmit = () => {
    if (
      email.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      alert('Please fill in all the fields!');
      return;
    }
    if (!passwordValid) {
      alert('Your passwords do not match.');
      return;
    }

    if (passwordValid) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      };
      fetch('http://localhost:3000/register', requestOptions)
        .then((response) => response.json())
        .then((success) => {
          if (success) {
            navigate('/home');
          } else {
            console.error('failed');
          }
          return null;
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <div className="form">
      <div className="header row col-12 d-flex justify-content-center">
        <h3>Registration</h3>
      </div>
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="firstName">
            First Name{' '}
          </label>
          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className="form__label" htmlFor="lastName">
            Last Name{' '}
          </label>
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">
            Email{' '}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password{' '}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password{' '}
          </label>
          <input
            className={`form__input ${passwordValid ? '' : 'has-error'}`}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className="footer">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className={`btn ${passwordValid ? '' : 'has-error'}`}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
