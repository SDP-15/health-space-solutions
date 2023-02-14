import { ChangeEvent, useState } from 'react';
import './style.css';

function LoginForm() {
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
      alert('Fill in all the fields!');
      return;
    }

    fetch('http://localhost:3000/login', requestOptions)
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          alert('Successfully logged in!');
          setEmail('');
          setPassword('');
        } else {
          alert('Wrong email or password!');
          setEmail('');
          setPassword('');
        }
        return null;
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="form">
      <div className="header row col-12 d-flex justify-content-center">
        <h3>Login</h3>
      </div>
      <div className="form-body">
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
      </div>
      <div className="footer">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className={`btn ${passwordValid ? '' : 'has-error'}`}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
