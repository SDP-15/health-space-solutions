import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationForm from 'components/RegistrationForm';
import Welcome from 'components/WelcomePage';
import Footer from '../components/Footer';
import Seat from '../components/Seat';

function Home() {
  return (
    <div>
      <div> Home </div>
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
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/eye" element={<Eye />} />
      </Routes>
    </Router>
  );
}
