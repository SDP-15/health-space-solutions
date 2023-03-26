import { useState, useEffect } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Label,
  ResponsiveContainer,
} from 'recharts';
import './style.css';

function DateFormatter(unix_timestamp: number) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = `0${date.getMinutes()}`;
  // Seconds part from the timestamp
  const seconds = `0${date.getSeconds()}`;

  // Will display time in 10:30:23 format
  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  return formattedTime;
}

function Graph(timeframe: { timeframe: string }) {
  const [time, setTime] = useState(Date.now());
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/score/moving_average?timeframe=${timeframe.timeframe}`
    )
      .then((response) => response.json())
      .then((res_data) => {
        setData(res_data);
        return 1;
      })
      .catch((err) => console.warn(err));
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [timeframe, time]);

  return (
    <ResponsiveContainer width="100%" height="70%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
        <XAxis
          dataKey="timestamp"
          minTickGap={100}
          tickFormatter={DateFormatter}
        >
          <Label
            value="Time of Day"
            offset={-3}
            position="insideBottom"
            style={{ fontSize: '0.8vw' }}
          />
        </XAxis>
        <YAxis dataKey="score" domain={[0, 100]}>
          <Label
            angle={270}
            offset={-10}
            value="Posture Rating"
            style={{ fontSize: '0.8vw' }}
          />
        </YAxis>
        <Line
          type="monotone"
          dataKey="score"
          stroke="#fff"
          yAxisId={0}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
