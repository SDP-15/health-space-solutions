import BarChartEyeAssist from 'components/BarChartEyeAssist';
import Footer from '../Footer';
import './style.css';

function EyeTrackingPage() {
  return (
    <div className="eye-tracking-page">
      {/* <div className="logoDiv">
        <img src={eyeLogo} className="eyeAssist" alt="eyeAssist" />
        <h1> EyeAssist</h1>
  </div> */}
      <div className="logoDiv">
        <h1>EyeAssist</h1>
        <img src={eyeLogo} className="eyeAssist" alt="icon" />
        <p className="par">
          EyeAssist tracks how long you have been looking at your screen for,
          and <b>notifies</b> you to look away after you’ve been looking for too
          long.
          <br />
          Below is a graph showing you how long the periods of time you were
          looking at your screen before taking time to look away.
        </p>
      </div>
      <div className="eyeGraph">
        <BarChartEyeAssist />
      </div>
      <Footer />
    </div>
  );
}
export default EyeTrackingPage;
