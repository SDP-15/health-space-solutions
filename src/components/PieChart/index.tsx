import { PieChart, Pie, Legend, Label, ResponsiveContainer, TooltipProps, Tooltip } from 'recharts';
import './style.css';
import { useState, ChangeEvent } from 'react';
import { BiRefresh } from 'react-icons/bi';

export default function piechart() {
  const data = [
    { name: 'Good', time: 200, fill: 'lightgreen' },
    { name: 'Poor', time: 100, fill: '#DC143C' },
  ];

  const totalTime = '8h 0m';

  const [date, setDate] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Selected Date: ${date}`);
  };

  interface CustomTooltipProps extends TooltipProps {
    active?: boolean;
    payload?: { value: string, name: string }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload) {
      const explanation = payload[0].name === "Good"
        ? "Your posture score measures how well you maintain good posture throughout the day. A higher score means better posture."
        : "Your posture score measures how well you maintain proper posture throughout the day. A lower score means that you should make adjustments to your posture.";
      const totalTime = payload.reduce((sum, entry) => sum + parseInt(entry.value), 0);
      const goodTime = parseInt(payload.find(entry => entry.name === "Good")?.value ?? "0");
      const badTime = parseInt(payload.find(entry => entry.name === "Poor")?.value ?? "0");
      const goodPercentage = ((goodTime / totalTime) * 100).toFixed(2);
      const badPercentage = ((badTime / totalTime) * 100).toFixed(2);
      const percentage = payload[0].name === "Good" ? goodPercentage : badPercentage;
      return (
        <div className="custom-tooltip">
          <p>{`Posture: ${payload[0].name}`}</p>
          <p>{`Percentage: ${percentage}`}</p>
          <p>{explanation}</p>
        </div>
      );
    }
    return null;
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
          <Tooltip content={<CustomTooltip /> } />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
