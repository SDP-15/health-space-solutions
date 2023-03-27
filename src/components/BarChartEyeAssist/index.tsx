import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ReferenceLine,
  Label,
  ResponsiveContainer,
} from 'recharts';
import './style.css';
import { useEffect, useState } from 'react';

export default function BarChartEyeAssist() {
  const [time, setTime] = useState(Date.now());
  const [bars, setBars] = useState([
    { duration: 12 },
    { duration: 20 },
    { duration: 64 },
    { duration: 35 },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3000/eye/bars`)
      .then((response) => response.json())
      .then((res_data) => {
        setBars(res_data);
        return 1;
      })
      .catch((err) => console.warn(err));

    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={bars}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label="Period" />
        <YAxis>
          <Label angle={270} offset={-10} value="Minutes" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="duration" fill="#8884d8" />
        <ReferenceLine y={20} stroke="red" strokeDasharray="3 3" />
      </BarChart>
    </ResponsiveContainer>
  );
}
