import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ReferenceLine,
} from 'recharts';
import './style.css';
import {
  // useEffect,
  useState,
} from 'react';
import { number, string } from 'prop-types';

const AxisLabel = ({ x, y, height, children, stroke }) => {
  const cx = x;
  const cy = height / 2 + y;
  const rot = `270 ${cx} ${cy}`;
  return (
    <text
      x={cx}
      y={cy}
      stroke={stroke}
      fill={stroke}
      transform={`rotate(${rot})`}
      textAnchor="middle"
    >
      {children}
    </text>
  );
};
AxisLabel.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  height: number.isRequired,
  children: string.isRequired,
  stroke: string.isRequired,
};

export default function BarChartEyeAssist() {
  const [time, setTime] = useState(Date.now());
  const [bars, setBars] = useState([
    { duration: 12 },
    { duration: 20 },
    { duration: 64 },
    { duration: 35 },
  ]);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/eye/bars`)
  //       .then((response) => response.json())
  //       .then((res_data) => {
  //         setBars(res_data);
  //         return 1;
  //       })
  //       .catch((err) => console.warn(err));

  //     const interval = setInterval(() => setTime(Date.now()), 60000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [time]);

  return (
    <BarChart width={730} height={250} data={bars}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label="Period" />
      <YAxis
        label={
          <AxisLabel x={20} y={100} height={10} stroke="white">
            Minutes
          </AxisLabel>
        }
      />
      <Tooltip />
      <Bar dataKey="duration" fill="#8884d8" />
      <ReferenceLine y={20} stroke="red" strokeDasharray="3 3" />
    </BarChart>
  );
}
