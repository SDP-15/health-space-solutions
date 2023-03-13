import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from 'components/Footer';
import DoNotDisturbForm from './DoNotDisturb';
import NotificationForm from './Notifications';

import './style.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const forgetUser = () => {
    AsyncStorage.removeItem('loggedIn');
    navigate('/');
  };

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <div className="Form">
        <DoNotDisturbForm />
      </div>
      <div className="Form">
        <NotificationForm />
      </div>
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
