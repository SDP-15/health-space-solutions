import Graph from 'components/Graph';
import Piechart from 'components/PieChart';
import PostureForms from 'components/PostureForms';
import Footer from 'components/Footer';
import './style.css';
import { useState } from 'react';

export default function PosturePalPage() {
  const [timeframe, setTimeframe] = useState('today');

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
