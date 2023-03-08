import './style.css';
import crossedLegsIcon from '../../../assets/crossedlegsIcon.png';
import hunchingIcon from '../../../assets/hunchingoverIcon.png';
import slouchingIcon from '../../../assets/slouchingIcon.png';
import CanvasJSReact from './canvasjs.react';

export default function Visualisations() {
  const hunchingPer = 10;
  const slouchingPer = 30;
  const crossedPer = 60;

  let barColorH: string;
  let barColorS: string;
  let barColorC: string;

  if (hunchingPer < 20) {
    barColorH = 'lightgreen';
  } else if (hunchingPer >= 20 && hunchingPer < 50) {
    barColorH = 'orange';
  } else {
    barColorH = '#DC143C';
  }

  if (slouchingPer < 20) {
    barColorS = 'lightgreen';
  } else if (slouchingPer >= 20 && slouchingPer < 50) {
    barColorS = 'orange';
  } else {
    barColorS = '#DC143C';
  }

  if (crossedPer < 20) {
    barColorC = 'lightgreen';
  } else if (crossedPer >= 20 && crossedPer < 50) {
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
