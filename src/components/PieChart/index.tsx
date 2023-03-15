import { PieChart, Pie, Legend, Label, ResponsiveContainer } from 'recharts';
import './style.css';
import { useEffect, useState } from 'react';
// import { BiRefresh } from 'react-icons/bi';

export default function Piechart() {
  const [goodPer, setGoodPer] = useState(0);
  const [badPer, setBadPer] = useState(0);
  useEffect(() => {
    fetch('http://localhost:3000/score/percentage')
      .then((response) => response.json())
      .then((res_data) => {
        setGoodPer(res_data.good);
        setBadPer(res_data.bad);
        return 1;
      })
      .catch((err) => console.warn(err));
  }, []);

  const data = [
    { name: 'Good', time: goodPer, fill: 'lightgreen' },
    { name: 'Poor', time: badPer, fill: '#DC143C' },
  ];

  // const [date, setDate] = useState('');

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setDate(event.target.value);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(`Selected Date: ${date}`);
  // };
  return (
    <div className="pie-chart">
      {/* <form onSubmit={handleSubmit} className="form-container">
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
      </form> */}
      <h1>Overall</h1>
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
