import Footer from 'components/Footer';
import DoNotDisturbForm from './DoNotDisturb';
import NotificationForm from './Notifications';
import './style.css';

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>
      <DoNotDisturbForm />
      <NotificationForm />
      <Footer />
    </>
  );
}
