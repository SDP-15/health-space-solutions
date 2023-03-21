import Graph from 'components/Graph';
import Piechart from 'components/PieChart';
import PostureForms from 'components/PostureForms';
import Footer from 'components/Footer';
import './style.css';
import { useEffect, useState } from 'react';

export default function PosturePalPage() {
  const [timeframe, setTimeframe] = useState('today');
  const [time, setTime] = useState(Date.now());
  const NOTIFICATION_TITLE = 'Warning';
  const NOTIFICATION_BODY = 'Poor Posture';
  const threshold = 0.5;

  useEffect(() => {
    fetch(`http://localhost:3000/score/percentage?timeframe=5min`)
      .then((response) => response.json())
      .then((res_data) => {
        if (res_data.good < threshold) {
          const customNotification = new Notification(NOTIFICATION_TITLE, {
            body: NOTIFICATION_BODY,
          });
        }
        return 1;
      })
      .catch((err) => console.warn(err));

    const interval = setInterval(() => setTime(Date.now()), 5 * 60000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(event.target.value);
  };

  return (
    <div className="container">
      <div className="form-row">
        <select
          id="disturb"
          value={timeframe}
          onChange={handleChange}
          className="form_input"
        >
          <option value="today">Today</option>
          <option value="30min">Last 30 Minutes</option>
        </select>
      </div>
      <div className="pictures">
        <PostureForms timeframe={timeframe} />
      </div>
      <div className="wrapper">
        <div className="piechart">
          <Piechart timeframe={timeframe} />
        </div>
        <div className="graph">
          <p className="heading"> Your Posture Scoring</p>
          <Graph timeframe={timeframe} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
