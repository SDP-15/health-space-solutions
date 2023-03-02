import { useState, ChangeEvent } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../../../assets/healthspace4.png';

function RegistrationForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

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
    <div className="form-register">
      <img src={icon} className="icon-reg" alt="icon" />
      <div className="header-reg row col-12 d-flex justify-content-center">
        Create An Account
      </div>
      <div className="form-body">
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
