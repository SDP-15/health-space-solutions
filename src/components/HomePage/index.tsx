import './style.css';
import Footer from 'components/Footer';
import icon from '../../../assets/healthspace4.png';

function Home() {
  return (
    <div className="HomePage">
      <img src={icon} className="icon" alt="icon" />
      <div>
        <h1 className="heading">Welcome To HealthSpace Solutions</h1>
        <p className="para">
          After a long and demanding day at the office, you finally stand up
          from your desk, only to feel a tight and painful sensation in your
          neck. Despite your efforts to alleviate the discomfort by stretching
          and rotating your neck, nothing seems to work. With massage parlours
          closed for the night, you reluctantly head home with the ache still
          present. The pain persists even into the next day, continuing the
          never-ending cycle of unhealthy office work.
        </p>
        <p className="para">
          Say goodbye to neck pain and back pain caused by long hours in the
          office. Introducing HealthSpace Solutions, the solution to all your
          office health problems. Our innovative products use pressure sensors
          and artificial intelligence to analyse your posture and remind you to
          maintain proper posture throughout the day. We provide a highly
          modular system so that you can choose the right product for your
          individual needs. No more stiff necks or pained back after a long day
          at work. Embrace good office health with HealthSpace Solutions.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
