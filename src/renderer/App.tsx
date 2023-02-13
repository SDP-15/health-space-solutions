import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationForm from 'components/RegistrationForm';
import SettingsPage from 'components/SettingsPage';
import Footer from 'components/Footer';

function Home() {
  fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((users) => console.warn(users))
    .catch(() => console.warn('failed'));

  return (
    <div>
      <div> Home </div>
      <Footer />
    </div>
  );
}

function Seat() {
  return (
    <div>
      <div> Seat </div>
      <Footer />
    </div>
  );
}

function Eye() {
  return (
    <div>
      <div> EyeTracker </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/eye" element={<Eye />} />
      </Routes>
    </Router>
  );
}
