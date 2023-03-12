import Graph from 'components/Graph';
import Footer from '../Footer';

import './style.css';

function Seat() {
  return (
    <div>
      <div className="graph">
        <Graph />
      </div>
      <Footer />
    </div>
  );
}
export default Seat;
