import './style.css';
import { useEffect, useState } from 'react';
import crossedLegsIcon from '../../../assets/crossedlegsIcon.png';
import hunchingIcon from '../../../assets/hunchingoverIcon.png';
import slouchingIcon from '../../../assets/slouchingIcon.png';

export default function Visualisations(timeframe: { timeframe: string }) {
  const [hunchingPer, setHunchingPer] = useState(0);
  const [slouchingPer, setSlouchingPer] = useState(0);
  const [crossedPer, setCrossedPer] = useState(0);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    fetch(`http://localhost:3000/score/split?timeframe=${timeframe.timeframe}`)
      .then((response) => response.json())
      .then((res_data) => {
        setHunchingPer(Math.round(res_data.hunching * 100));
        setSlouchingPer(Math.round(res_data.slouching * 100));
        setCrossedPer(Math.round(res_data.crossing_legs * 100));
        return 1;
      })
      .catch((err) => console.warn(err));

    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeframe, time]);

  let barColorH: string;
  let barColorS: string;
  let barColorC: string;

  if (hunchingPer < 10) {
    barColorH = 'lightgreen';
  } else if (hunchingPer >= 10 && hunchingPer < 30) {
    barColorH = 'orange';
  } else {
    barColorH = '#DC143C';
  }

  if (slouchingPer < 10) {
    barColorS = 'lightgreen';
  } else if (slouchingPer >= 10 && slouchingPer < 30) {
    barColorS = 'orange';
  } else {
    barColorS = '#DC143C';
  }

  if (crossedPer < 10) {
    barColorC = 'lightgreen';
  } else if (crossedPer >= 10 && crossedPer < 30) {
    barColorC = 'orange';
  } else {
    barColorC = '#DC143C';
  }

  return (
    <div className="section">
      <div className="hoverwrap">
        <img src={hunchingIcon} className="icons" alt="icon" />
        <div className="hovercap">
          Hunching Over <br /> {hunchingPer} % of the time
        </div>
        <div
          className="bar"
          style={{
            width: `${hunchingPer * 1.5}px`,
            backgroundColor: barColorH,
          }}
        />
      </div>

      <div className="hoverwrap">
        <img src={slouchingIcon} className="icons" alt="icon" />
        <div className="hovercap">
          Slouching <br /> {slouchingPer} % of the time
        </div>
        <div
          className="bar"
          style={{
            width: `${slouchingPer * 1.5}px`,
            backgroundColor: barColorS,
          }}
        />
      </div>
      <div className="hoverwrap">
        <img src={crossedLegsIcon} className="icons" alt="icon" />
        <div className="hovercap">
          Crossed Legs <br /> {crossedPer} % of the time
        </div>
        <div
          className="bar"
          style={{
            width: `${crossedPer * 1.5}px`,
            backgroundColor: barColorC,
          }}
        />
      </div>
    </div>
  );
}
