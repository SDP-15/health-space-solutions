import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationForm from 'components/RegistrationForm';
import EyeTrackingPage from 'components/EyeTrackingPage';
import SettingsPage from 'components/SettingsPage';
import Welcome from 'components/WelcomePage';
import LoginForm from 'components/Login';
import Seat from 'components/Seat';
import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'components/HomePage';

export default function App() {
  return (
    <div className="home_page">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/seat" element={<Seat />} />
          <Route path="/eye" element={<EyeTrackingPage />} />
        </Routes>
      </Router>
    </div>
  );
}
