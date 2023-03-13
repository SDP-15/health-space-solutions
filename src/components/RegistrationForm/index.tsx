import { useState, ChangeEvent } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../../../assets/healthspace4.png';

function RegistrationForm() {
  const navigate = useNavigate();
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // regex for email validation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'firstName') {
      setFirstName(value);
    }
    if (id === 'lastName') {
      setLastName(value);
    }
    if (id === 'email') {
      setEmail(value);
      setEmailValid(expression.test(value));
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
      alert('Please fill in all the fields.');
      return;
    }
    if (password.length < 8) {
      alert('Use 8 or more characters for your password.');
      return;
    }
    if (!passwordValid) {
      alert('Your passwords do not match.');
      return;
    }
    if (!emailValid) {
      alert('Please enter a valid email.');
      return;
    }

    if (passwordValid && emailValid) {
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
            alert('This email already exists.');
            console.error('failed');
          }
          return null;
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <div className="form-register">
      <img src={icon} className="icon-reg" alt="icon" />
      <div className="header-reg row col-12 d-flex justify-content-center">
        Create An Account
      </div>
      <div className="form-body-reg">
        <div className="username">
          <input
            className="form_input-reg"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form_input-reg"
            onChange={(e) => handleInputChange(e)}
            placeholder="Last Name"
          />
        </div>
        <div className="email">
          <input
            type="email"
            id="email"
            className="form_input-reg"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <input
            className="form_input-reg"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <input
            className={`form_input-reg ${passwordValid ? '' : 'has-error'}`}
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
          className={`btn-reg ${passwordValid ? '' : 'has-error'}`}
        >
          Register
        </button>
      </div>
      <div className="exit-reg">
        <NavLink to="/login" className="has-account-link">
          Already have an account?
        </NavLink>
      </div>
    </div>
  );
}

export default RegistrationForm;
