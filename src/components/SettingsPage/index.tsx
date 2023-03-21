import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from 'components/Footer';
import { useState } from 'react';
import settingsVar from 'settingsVar';

import icon from '../../../assets/healthspace4.png';
import './style.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const forgetUser = () => {
    AsyncStorage.removeItem('loggedIn');
    navigate('/');
  };
  const [doNotDisturb, setDoNotDisturb] = useState(settingsVar.doNotDisturb);
  const [notifications, setNotifications] = useState(
    settingsVar.notifyAfterMins
  );

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
    settingsVar.doNotDisturb = doNotDisturb;
    settingsVar.notifyAfterMins = notifications;
    console.log(`Selected options: ${doNotDisturb}, ${notifications}`);
    const doString =
      doNotDisturb === -1
        ? 'Until Turned Off'
        : doNotDisturb === 0
        ? 'Off'
        : `${doNotDisturb} Minutes`;
    alert(`Changes Have Been Applied.
     Do Not Disturb: ${doString}
     Notify After: ${notifications} Minutes`);
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
            <option value={0}>Off</option>
            <option value={60}>1 Hour</option>
            <option value={120}>2 Hour</option>
            <option value={-1}>Until Turned Off</option>
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
            <option value={1}>1 minute</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>
        <button type="submit" className="button-class">
          Apply Changes
        </button>
      </form>
      <form className="form-container">
        <button
          form="logout_form"
          onClick={() => forgetUser()}
          type="submit"
          className="button-class-logout"
        >
          Log Out
        </button>
      </form>
      <Footer />
    </div>
  );
}
