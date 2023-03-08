import { PieChart, Pie, Legend, Label } from 'recharts';
import './style.css';

function piechart() {
  const data = [
    { name: 'Good', time: 200, fill: 'lightgreen' },
    { name: 'Poor', time: 100, fill: 'red' },
  ];

  const totalTime = '8h 0m';
  return (
    <div>
      <PieChart width={250} height={250}>
        <Pie data={data} dataKey="time" innerRadius={60} outerRadius={80}>
          <Label position="center" fontSize={14} fill="white">
            Total Time:{totalTime}
          </Label>
        </Pie>
        <Legend verticalAlign="bottom" height={36} iconType="circle" />
      </PieChart>
    </div>
  );
}

export default piechart;
