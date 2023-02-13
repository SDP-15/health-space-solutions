import { NavLink } from 'react-router-dom';
import icon from '../../../assets/healthspace4.png';
import './style.css';

export default function Welcome() {
  return (
    <div>
      <div className="Hello">
        <img width="200" src={icon} className="welcomeLogo" alt="icon" />
      </div>
      <div className="Hello">
        <NavLink to="/login">
          <button type="button">Sign In</button>
        </NavLink>
        <NavLink to="/register">
          <button type="button">Register</button>
        </NavLink>
      </div>
    </div>
  );
}
