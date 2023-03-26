import { useRef, useEffect, useState } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Label,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts';
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
  const [active, setActive] = useState<boolean>(false);
  const [payload, setPayload] = useState<boolean>(false);
  const [label, setLabel] = useState<boolean>(false);

  interface CustomTooltipProps extends TooltipProps {
    active?: boolean;
    payload?: { value: string }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active) {
      return (
        <div className="custom-tooltip" >
          <p>{`Time: ${label}`}</p>
          <p>{`Posture Score: ${payload[0].value}`}</p>
          <p>{`Your posture score measures how well you maintain good posture throughout the day. A higher score means better posture.`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="70%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
        <XAxis dataKey="name">
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
        <Line type="monotone" dataKey="score" stroke="#fff" yAxisId={0} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
