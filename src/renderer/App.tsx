import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationForm from 'components/RegistrationForm';
import Footer from '../components/Footer';
import Seat from '../components/Seat';

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

function SeatDiv() {
  return (
    <div>
      <div>
        <Seat />
      </div>
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
        <Route path="/home" element={<RegistrationForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/seat" element={<SeatDiv />} />
        <Route path="/eye" element={<Eye />} />
      </Routes>
    </Router>
  );
}
