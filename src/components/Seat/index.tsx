import { useEffect, useState } from 'react';
import ChairPic from '../../../assets/officechair.png';
import Footer from '../Footer';
import './style.css';

function Seat() {
  const [pressureSensorReadings, setData] = useState([]);

  function changePressurePadColour(squareNumber: number, isPressed: boolean) {
    const square = document.getElementById(`square${squareNumber.toString()}`);
    if (square) {
      if (isPressed) {
        square.style.backgroundColor = 'darkred';
      } else {
        square.style.backgroundColor = 'grey';
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < pressureSensorReadings.length; i += 1) {
      const padNumber = pressureSensorReadings[i].sensor_id;
      const pressureData = pressureSensorReadings[i].reading;
      let isPressed: boolean;
      if (pressureData < 100) {
        isPressed = false;
      } else {
        isPressed = true;
      }
      changePressurePadColour(padNumber, isPressed);
    }
  });

  async function handlePressurePads() {
    try {
      const response = await fetch(
        'http://localhost:3000/pressure_sensor_data'
      );

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="container">
        <div>
          <img className="chair" src={ChairPic} alt="chairPic" />
          <div className="square" id="square1" role="presentation" />
          <div className="square" id="square2" role="presentation" />
          <div className="square" id="square3" role="presentation" />
          <div className="square" id="square4" role="presentation" />
          <div className="square" id="square5" role="presentation" />
          <div className="square" id="square6" role="presentation" />
          <div className="square" id="square7" role="presentation" />
          <div className="square" id="square8" role="presentation" />
        </div>
      </div>
      <div>
        <button type="button" id="submitButton" onClick={handlePressurePads}>
          Submit
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Seat;
