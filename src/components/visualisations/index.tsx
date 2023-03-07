import './style.css';
import crossedLegsIcon from '../../../assets/crossedlegsIcon.png';
import hunchingIcon from '../../../assets/hunchingoverIcon.png';
import slouchingIcon from '../../../assets/slouchingIcon.png';
import CanvasJSReact from './canvasjs.react';

export default function Visualisations() {
  const hunchingPer = 20;
  const slouchingPer = 30;
  const crossedPer = 60;

  let barColorH: string;
  let barColorS: string;
  let barColorC: string;

  if (hunchingPer < 20) {
    barColorH = 'green';
  } else if (hunchingPer >= 20 && hunchingPer < 50) {
    barColorH = 'orange';
  } else {
    barColorH = 'red';
  }

  if (slouchingPer < 20) {
    barColorS = 'green';
  } else if (slouchingPer >= 20 && slouchingPer < 50) {
    barColorS = 'orange';
  } else {
    barColorS = 'red';
  }

  if (crossedPer < 20) {
    barColorC = 'green';
  } else if (crossedPer >= 20 && crossedPer < 50) {
    barColorC = 'orange';
  } else {
    barColorC = 'red';
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
            width: `${hunchingPer}px`,
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
            width: `${slouchingPer}px`,
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
            width: `${crossedPer}px`,
            backgroundColor: barColorC,
          }}
        />
      </div>
    </div>
  );
}
