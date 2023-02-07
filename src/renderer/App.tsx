import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from '../components/Footer';

function Home() {
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
        <Route path="/" element={<Home />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/eye" element={<Eye />} />
      </Routes>
    </Router>
  );
}
