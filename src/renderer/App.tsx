import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import './App.css';

const data = [{name: 'Monday', score: 400},
              {name: 'Tuesday', score: 100},
              {name: 'Wednesday', score: 2},
              {name: 'Thursday', score: 500},
              {name: 'Friday', score: 8},
              {name: 'Saturday', score: 12},
              {name: 'Sunday', score: 1233},];

const Hello = () => {
  return (
    <div>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis dataKey="score" />
        <Line type="monotone" dataKey="score" stroke="#fff" yAxisId={0} />
      </LineChart>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
