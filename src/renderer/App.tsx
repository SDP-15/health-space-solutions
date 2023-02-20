import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import RegistrationForm from 'components/RegistrationForm';
import EyeTrackingPage from 'components/EyeTrackingPage';
import SettingsPage from 'components/SettingsPage';
import Welcome from 'components/WelcomePage';
import LoginForm from 'components/Login';
import Footer from 'components/Footer';
import Seat from 'components/Seat';
import PrivateRoute from 'components/PrivateRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home() {
  const navigate = useNavigate();
  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('loggedIn');
      navigate('/');
      console.log('navigation activated to /');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div> Home </div>
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

export default function App() {
  return (
    <div className="home_page">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/seat" element={<Seat />} />
          <Route path="/eye" element={<EyeTrackingPage />} />
        </Routes>
      </Router>
    </div>
  );
}
