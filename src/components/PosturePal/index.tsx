import Graph from 'components/Graph';
import Piechart from 'components/PieChart';
import PostureForms from 'components/PostureForms';
import Footer from 'components/Footer';
import './style.css';

export default function PosturePalPage() {
  return (
    <div className="container">
      <div className="pictures">
        <PostureForms />
      </div>
      <div className="wrapper">
        <div className="piechart">
          <Piechart />
        </div>
        <div className="graph">
          <p className="heading">Todays Posture Scoring</p>
          <Graph />
        </div>
      </div>
      <Footer />
    </div>
  );
}
