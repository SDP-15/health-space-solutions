import { LineChart, XAxis, YAxis, CartesianGrid, Line, Label } from 'recharts';
import './style.css';

function Graph() {
  const data = [
    { name: '09:00', score: 80 },
    { name: '10:00', score: 90 },
    { name: '11:00', score: 65 },
    { name: '12:00', score: 85 },
    { name: '13:00', score: 60 },
    { name: '14:00', score: 62 },
    { name: '15:00', score: 65 },
    { name: '16:00', score: 50 },
    { name: '17:00', score: 43 },
  ];

  return (
    <div>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        width={400}
        height={240}
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
