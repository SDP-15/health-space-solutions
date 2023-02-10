import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import Chair from './Chair';
import './App.css';

export default function App() {
  return (
    <div id="scene">
      <Chair />
    </div>
  );
}
