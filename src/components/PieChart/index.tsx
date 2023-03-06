import { PieChart, Pie, Legend } from 'recharts';
import './style.css';

function piechart() {
  const data = [
    { name: 'Good', time: 200, fill: '#556B2F' },
    { name: 'Adequate', time: 250, fill: '#B8860B' },
    { name: 'Poor', time: 100, fill: '#A52A2A' },
  ];

  return (
    <>
      <PieChart width={250} height={250}>
        <Pie data={data} dataKey="time" innerRadius={60} outerRadius={80} />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
      <p>Total Time: 8 hours</p>
    </>
  );
}

export default piechart;
