import './style.css';
import Footer from 'components/Footer';
import icon from '../../../assets/healthspace4.png';
import eyeLogo from '../../../assets/eyeAssist.png';
import postureLogo from '../../../assets/sittingGood1.png';

function Home() {
  return (
    <div className="HomePage">
      <img src={icon} className="icon" alt="icon" />
      <div>
        <h1 className="heading">Welcome To HealthSpace Solutions</h1>
        <p className="para-i">
          At HealthSpace Solutions, our goal is to offer a comprehensive line of
          products that can help you stay healthy and productive while working
          at your desk.
        </p>
        <div className="section">
          <h1>PosturePal</h1>
          <img src={postureLogo} className="logo" alt="icon" />
          <p className="para-p">
            PosturePal is a <b>sleeve</b> you attach to your chair. Using{' '}
            <b>pressure sensors</b> your posture is tracked. Get <b>notified</b>{' '}
            when you are sitting with bad posture. On the PosturePal app view a{' '}
            <b>personalised analysis</b> of your posture and get recommendations
            on how to improve.
          </p>
        </div>
        <div className="section">
          <h1>EyeAssist</h1>
          <img src={eyeLogo} className="logo-e" alt="icon" />
          <p className="para-e">
            Never look at your screen for too long with EyeAssist! Using new{' '}
            <b>eye tracking</b> technology, EyeAssist tracks how long you have
            been looking at your screen for, and <b>notifies</b> you to look
            away after you’ve been looking for too long.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
