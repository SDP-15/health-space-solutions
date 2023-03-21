import { PieChart, Pie, Legend, Label, ResponsiveContainer } from 'recharts';
import './style.css';
import { useEffect, useState } from 'react';

export default function Piechart(timeframe: { timeframe: string }) {
  const [goodPer, setGoodPer] = useState(0);
  const [badPer, setBadPer] = useState(0);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    fetch(
      `http://localhost:3000/score/percentage?timeframe=${timeframe.timeframe}`
    )
      .then((response) => response.json())
      .then((res_data) => {
        setGoodPer(res_data.good);
        setBadPer(res_data.bad);
        return 1;
      })
      .catch((err) => console.warn(err));

    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeframe, time]);

  const data = [
    { name: 'Good', time: goodPer, fill: 'lightgreen' },
    { name: 'Poor', time: badPer, fill: '#DC143C' },
  ];
  return (
    <div className="pie-chart">
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
