import Footer from 'components/Footer';
import DoNotDisturbForm from './DoNotDisturb';
import NotificationForm from './Notifications';
import './style.css';

export default function SettingsPage() {
  return (
    <div className="Settings">
      <h1>Settings</h1>
      <div className="Form">
        <DoNotDisturbForm />
      </div>
      <div className="Form">
        <NotificationForm />
      </div>
      <Footer />
    </div>
  );
}
