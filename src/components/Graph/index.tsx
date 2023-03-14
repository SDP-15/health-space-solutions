import { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Label } from 'recharts';
import './style.css';

function Graph() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/score/moving_average')
      .then((response) => response.json())
      .then((res_data) => {
        setData(
          res_data.map((score: number, index: number) => {
            return { name: index, score };
          })
        );
        return 1;
      })
      .catch((err) => console.warn(err));
  }, []);

  console.log(data);
  // const data = [
  //   { name: '09:00', score: 80 },
  //   { name: '10:00', score: 90 },
  //   { name: '11:00', score: 65 },
  //   { name: '12:00', score: 85 },
  //   { name: '13:00', score: 60 },
  //   { name: '14:00', score: 62 },
  //   { name: '15:00', score: 65 },
  //   { name: '16:00', score: 50 },
  //   { name: '17:00', score: 43 },
  // ];

  return (
    <div>
      <h1>Todays Posture Scoring</h1>
      <LineChart
        width={620}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
        <XAxis dataKey="name">
          <Label
            value="Time of Day"
            offset={0}
            position="insideBottom"
            style={{ fontSize: '65%' }}
          />
        </XAxis>
        <YAxis dataKey="score" domain={[0, 100]}>
          <Label
            angle={270}
            value="Posture Rating"
            style={{ fontSize: '65%' }}
          />
        </YAxis>
        <Line type="monotone" dataKey="score" stroke="#fff" yAxisId={0} />
      </LineChart>
    </div>
  );
}

export default Graph;
