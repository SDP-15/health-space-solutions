import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from '../components/Footer';

function Hello() {
  return <Footer />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
