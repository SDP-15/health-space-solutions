import { PieChart, Pie, Legend, Label, ResponsiveContainer } from 'recharts';
import './style.css';
import { useState } from 'react';
import { BiRefresh } from 'react-icons/bi';

export default function Piechart() {
  const data = [
    { name: 'Good', time: 200, fill: 'lightgreen' },
    { name: 'Poor', time: 100, fill: '#DC143C' },
  ];

  const [date, setDate] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Selected Date: ${date}`);
  };
  return (
    <div className="pie-chart">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <select
            id="disturb"
            value={date}
            onChange={handleChange}
            className="form_input"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
          </select>
          <button type="submit" className="refresh-button">
            <BiRefresh className="refresh-icon" />
          </button>
        </div>
      </form>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart /* width={250} height={250} */>
          <Pie
            data={data}
            dataKey="time"
            /* innerRadius={60} outerRadius={80} */
          >
            <Label /*
              value={`TOTAL ${totalTime}`}
              position="center"
              fontSize={14}
              fill="white" */
            />
          </Pie>
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
