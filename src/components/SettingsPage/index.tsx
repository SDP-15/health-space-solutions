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
  const [doNotDisturbPosture, setDoNotDisturbPosture] = useState(
    settingsVar.doNotDisturbPosture
  );
  const [notificationsPosture, setNotificationsPosture] = useState(
    settingsVar.notifyAfterMinsPosture
  );
  const [doNotDisturbEye, setDoNotDisturbEye] = useState(
    settingsVar.doNotDisturbEye
  );
  const [notificationsEye, setNotificationsEye] = useState(
    settingsVar.notifyAfterMinsEye
  );

  const handleDoNotDisturbPostureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDoNotDisturbPosture(event.target.value);
  };

  const handleNotificatPostureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNotificationsPosture(event.target.value);
  };

  const handleDoNotDisturbEyeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDoNotDisturbEye(event.target.value);
  };

  const handleNotificatEyeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNotificationsEye(event.target.value);
  };

  const handleSubmitPosture = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    settingsVar.doNotDisturbPosture = doNotDisturbPosture;
    settingsVar.notifyAfterMinsPosture = notificationsPosture;
    console.log(
      `Selected options: ${doNotDisturbPosture}, ${notificationsPosture}`
    );
    const doStringPosture =
      doNotDisturbPosture === -1
        ? 'Until Turned Off'
        : doNotDisturbPosture === 0
        ? 'Off'
        : `${doNotDisturbPosture} Minutes`;
    alert(`Changes Have Been Applied.
     Do Not Disturb: ${doStringPosture}
     Notify After: ${notificationsPosture} Minutes`);
  };

  const handleSubmitEye = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    settingsVar.doNotDisturbEye = doNotDisturbEye;
    settingsVar.notifyAfterMinsEye = notificationsEye;
    console.log(`Selected options: ${doNotDisturbEye}, ${notificationsEye}`);
    const doStringEye =
      doNotDisturbEye === -1
        ? 'Until Turned Off'
        : doNotDisturbEye === 0
        ? 'Off'
        : `${doNotDisturbEye} Minutes`;
    alert(`Changes Have Been Applied.
     Do Not Disturb: ${doStringEye}
     Notify After: ${notificationsEye} Minutes`);
  };

  return (
    <div className="Settings">
      <img src={icon} className="icon-reg" alt="icon" />
      <div className="header-set row col-12 d-flex justify-content-center">
        Settings
      </div>
      <div className="settings-container d-flex">
        <div className="Posture" style={{ flexBasis: '50%' }}>
          <h1>PosturePal</h1>
          <form onSubmit={handleSubmitPosture} className="form-container">
            <div className="form-row">
              <label htmlFor="disturb">Do Not Disturb:</label>
              <select
                id="disturb"
                value={doNotDisturbPosture}
                onChange={handleDoNotDisturbPostureChange}
                className="form_input"
              >
                <option value={0}>Off</option>
                <option value={60}>1 Hour</option>
                <option value={120}>2 Hour</option>
                <option value={-1}>Until Turned Off</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="notification">
                Notify About Bad Posture After:
              </label>
              <select
                id="notification"
                value={notificationsPosture}
                onChange={handleNotificatPostureChange}
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
        </div>
        <div className="Eye" style={{ flexBasis: '50%' }}>
          <h1>EyeAssist</h1>
          <form onSubmit={handleSubmitEye} className="form-container">
            <div className="form-row">
              <label htmlFor="disturb">Do Not Disturb:</label>
              <select
                id="disturb"
                value={doNotDisturbEye}
                onChange={handleDoNotDisturbEyeChange}
                className="form_input"
              >
                <option value={0}>Off</option>
                <option value={60}>1 Hour</option>
                <option value={120}>2 Hour</option>
                <option value={-1}>Until Turned Off</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="notification">
                Notify to Look away after Screentime:
              </label>
              <select
                id="notification"
                value={notificationsEye}
                onChange={handleNotificatEyeChange}
                className="form_input"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
            <button type="submit" className="button-class">
              Apply Changes
            </button>
          </form>
        </div>
      </div>
      <form className="form-container-log">
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
