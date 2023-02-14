import { NavLink } from 'react-router-dom';
import icon from '../../../assets/healthspace4.png';
import './style.css';

export default function Welcome() {
  return (
    <div className="WelcomePage">
      <div className="Hello">
        <img width="200" src={icon} className="welcomeLogo" alt="icon" />
      </div>
      <div className="Hello">
        <NavLink to="/home">
          <button className="button-class" type="button">
            Sign In
          </button>
        </NavLink>
        <NavLink to="/register">
          <button className="button-class" type="button">
            Register
          </button>
        </NavLink>
      </div>
    </div>
  );
}
