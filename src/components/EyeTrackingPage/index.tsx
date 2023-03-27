import BarChartEyeAssist from 'components/BarChartEyeAssist';
import Footer from '../Footer';
import './style.css';

function EyeTrackingPage() {
  return (
    <div>
      {/* <div className="eye-tracking-page">
        <div>
          <h1>
            <b>EyeAssist</b>
          </h1>
          <h4>
            <b>The effect of digital screens on eyes</b>
          </h4>
          <p>
            Digital eye strain is a group of eye and vision problems caused by
            prolonged use of digital devices such as computers, tablets, or
            mobile phone use. Its symptoms include dry, uncomfortable, strained
            eyes as well as headaches blurred vision and even neck and shoulder
            pain{' '}
            <sup>
              <a href="https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome?sso=y">
                [1]
              </a>
            </sup>
            . A study conducted by lenstore in 2021{' '}
            <sup>
              <a href="https://www.lenstore.co.uk/research/devices-that-impact-eye-health/">
                [2]
              </a>
            </sup>{' '}
            revealed that on average, people spend 9 hours and 45 minutes
            looking at digital screens worldwide. The same study aimed to
            investigate the claim that prolonged time spent on digital devices
            damages eye health and found that 77% of UK adults say that their
            eyes feel strained after a long day at work staring at a digital
            screen. Another study conducted by Ophthalmic and Physiological
            Optics{' '}
            <sup>
              <a href="https://pubmed.ncbi.nlm.nih.gov/22775070/">[3]</a>
            </sup>{' '}
            questioned office workers in New York City and found that visual
            symptoms associated with computer use occur very frequently and are
            strongly associated with ocular surface disease, with the most
            prevalent symptom being tired eyes reported by 40% of office
            workers.
          </p>
          <p>
            EyeAssist is another group of functionalities that the health space
            solutions desktop app would provide alongside PosturePal. It exists
            to collect and analyse information about the user’s eye activity
            upon using a desktop computer through use of an inbuilt camera or
            webcam and use this data to help prevent digital eye strain and
            other eye related problems.
          </p>
          <h3>
            <b> Functionalities EyeAssist aims to provide</b>
          </h3>
          <h4>
            <b>20-20-20 Rule:</b>
          </h4>
          <p>
            {' '}
            The 20-20-20 rule suggests that for every 20 minutes spent using a
            screen you should look at something 20 feet away from you for a
            total of 20 seconds.{' '}
          </p>
          <p>
            A study published by the Nepalese Journal of Ophthalmology found
            that taking frequent breaks from looking at a computer screen as
            suggested above can significantly lessen eye strain symptoms{' '}
            <sup>
              <a href="https://www.nepjol.info/index.php/NEPJOPH/article/view/8707">
                [4]
              </a>
            </sup>
            .
          </p>
          <p>
            {' '}
            A timer class can be created to time each 20 minutes spent looking
            at the computer as well as time 20 seconds spent looking away from
            the computer. A notification with a sound pops up on the screen
            after 20 minutes is spent looking at the computer screen, telling
            the user to look away from the computer screen and onto a faraway
            object for 20 seconds. This starts a 20 second timer when the user
            is ready. After the 20 seconds is up the user will receive another
            sounded notification telling them they can look at their screen
            again.
          </p>
          <p>
            PyGaze: Can be used to determine whether or not the user is looking
            at their computer screen. eyetracker.sample() will return the newest
            available gaze position as an (x,y) gaze position tuple or (-1,-1)
            on an error. Eyetracker.sample() can be called repeatedly every few
            seconds during an interval and these values can be stored and then
            used in calculation to monitor whether or not the user has been
            looking at the screen for that period of time.
          </p>
          <p>
            GazeCloud API: Through use of the GazeCloud API{' '}
            <sup>
              <a href="https://gazerecorder.com/gazecloudapi/">[5]</a>
            </sup>{' '}
            to track the users eyes, we can determine whether or not the user is
            looking at their computer screen. GazeCloud API outputs a series of
            X and Y coordinates gathered every few milliseconds in a csv file
            that corresponds to the user’s viewport (size of their screen) with
            the origin (0,0) being at the centre of their screen. The user can
            input the size of their computer screen and relevant calculations
            can be performed to determine whether the user is looking at the
            screen or away from the screen every few milliseconds by checking
            whether the X and Y coordinates output exceed the bounds of the
            input screen size.
          </p>
          <div>
            <h4>
              <b>Blink Monitoring:</b>
            </h4>
            <p>
              {' '}
              A person on average will blink 18 times a minute. However, during
              computer/ other digital screen use, it is reported by a study from
              Bausch + Lomb that the average blink rate decreases by 66% as well
              a higher rate of incomplete blinks which are less functional{' '}
              <sup>
                <a href="https://bausch.co.uk/news/blink-rate">[6]</a>
              </sup>
              .
            </p>
            <p>
              Blinking is essential for eye health as it helps clean debris from
              your eyes, as well as wetting your eyes preventing dry eyes and
              reducing risk of problems with your tear film{' '}
              <sup>
                <a href="https://www.healthline.com/health/how-many-times-do-you-blink-a-day#bottom-line">
                  [7]
                </a>
              </sup>
              . However, by not blinking enough your eyes can dry out leading to
              eye pain and blurry vision as well as an increased risk of eye
              infection due to debris that stay in your eye.
            </p>
            <p>
              After every hour of using the computer, information about how many
              times the user blinks within that period of time will be
              collected. If the number of blinks within that period is below the
              average (15-20 blinks a minute are the average{' '}
              <sup>
                <a href="https://www.healthline.com/health/how-many-times-do-you-blink-a-day#bottom-line">
                  [7]
                </a>
              </sup>
              , 15 blinks*60 minutes = 900 blinks within an hour is lower range)
              then a notification will pop up reminding the user to try to blink
              more.
            </p>
            <p>
              PyGaze: PyGaze API provides relevant functions:
              wait_for_blink_start(), wait_for_blink_end(){' '}
              <sup>
                <a href="http://www.pygaze.org/documentation/eyetracker/#EyeTracker.wait_for_blink_start">
                  [8]
                </a>
              </sup>{' '}
              which return the timestamp of the start and end of a blink and can
              be used to log information and count how many times the user has
              blinked during their time using the computer.
            </p>
          </div>
          <div>
            <h4>
              <b>Customisable settings:</b>
            </h4>
            <p>
              To prevent disturbing the user during an important period of time
              a settings page should be available where the user can customise
              the timings for the 20-20-20 rule/blink monitoring functionality
              or turn it off entirely. For example, if the user were to be in an
              important online meeting for the next hour the user can either
              increase the period of 20 minutes of screen time to longer than an
              hour or instead choose to turn the feature off and turn it back on
              again later at their own discretion. The 20 seconds of time the
              user spends looking away from the screen can be adjustable too,
              the user can increase or decrease this period of time however they
              wish. The 20-20-20 rule which involves 20 minutes of screen time
              and 20 seconds spent looking away from the screen remains the
              default and recommended setting.
            </p>
          </div>
        </div>
      </div> */}
      <BarChartEyeAssist />
      <Footer />
    </div>
  );
}
export default EyeTrackingPage;
