import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from 'components/Footer';
import { useState } from 'react';

import icon from '../../../assets/healthspace4.png';
import './style.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const forgetUser = () => {
    AsyncStorage.removeItem('loggedIn');
    navigate('/');
  };
  const [doNotDisturb, setDoNotDisturb] = useState('');
  const [notifications, setNotifications] = useState('');

  const handleDoNotDisturbChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDoNotDisturb(event.target.value);
  };

  const handleNotificatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNotifications(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Selected options: ${doNotDisturb}, ${notifications}`);
    alert(`Changes Have Been Applied.
     Do Not Disturb: ${doNotDisturb}
     Notifications: ${notifications}`);
  };

  return (
    <div className="Settings">
      <img src={icon} className="icon-reg" alt="icon" />
      <div className="header-set row col-12 d-flex justify-content-center">
        Settings
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <label htmlFor="disturb">Do Not Disturb:</label>
          <select
            id="disturb"
            value={doNotDisturb}
            onChange={handleDoNotDisturbChange}
            className="form_input"
          >
            <option value="off">Off</option>
            <option value="1hr">1 Hour</option>
            <option value="2hr">2 Hour</option>
            <option value="untilOff">Until Turned Off</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="notification">Notify About Bad Posture After:</label>
          <select
            id="notification"
            value={notifications}
            onChange={handleNotificatChange}
            className="form_input"
          >
            <option value="5mins">5 minutes</option>
            <option value="10mins">10 minutes</option>
            <option value="20mins">20 minutes</option>
            <option value="30mins">30 minutes</option>
          </select>
        </div>
        <button type="submit" className="button-class">
          Apply Changes
        </button>
      </form>
      <form id="logout_form">
        <button
          form="logout_form"
          onClick={() => forgetUser()}
          type="submit"
          className="logout_button"
        >
          Log out
        </button>
      </form>
      <Footer />
    </div>
  );
}
