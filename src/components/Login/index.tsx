import { ChangeEvent, useState } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../../../assets/healthspace4.png';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    if (email.length === 0 || password.length === 0) {
      alert(`Fill in all the fields!`);
      return;
    }

    fetch('http://localhost:3000/login', requestOptions)
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          navigate('/home');
        } else {
          alert('Wrong email or password!');
        }
        return null;
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="form-login">
      <img src={icon} className="icon-log" alt="icon" />
      <div className="header-log row col-12 d-flex justify-content-center">
        Log In
      </div>
      <div className="form-body-log">
        <div className="email">
          <input
            type="email"
            id="email"
            className="form_input-log"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <input
            className="form_input-log"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="footer-log">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className={`btn-log ${passwordValid ? '' : 'has-error'}`}
        >
          Log In
        </button>
        <div>
          <NavLink to="/register" className="no-account-link">
            Don`t have an account?
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
