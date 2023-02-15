import { useState, useEffect } from 'react';
import Graph from 'components/Graph';
import ChairPic from '../../../assets/chair.png';
import Footer from '../Footer';

import './style.css';

function Seat() {
  const [serverData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/pressure_sensor_data'
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function changePressurePadColour(squareNumber: number, isPressed: boolean) {
    const square = document.getElementById(`square${squareNumber.toString()}`);
    if (square) {
      if (isPressed) {
        square.style.backgroundColor = 'darkred';
      } else {
        square.style.backgroundColor = 'white';
      }
    }
  }

  function handlePressurePads() {
    const NOTIFICATION_TITLE = 'Warning';
    const NOTIFICATION_BODY = 'Poor Posture';

    const customNotification = new Notification(NOTIFICATION_TITLE, {
      body: NOTIFICATION_BODY,
    });

    for (let i = 0; i < serverData.length; i += 1) {
      const padNumber = serverData[i].sensor_id;
      const pressureData = serverData[i].data;
      let isPressed: boolean;
      if (pressureData !== 0) {
        isPressed = true;
      } else {
        isPressed = false;
      }
      changePressurePadColour(padNumber, isPressed);
    }
  }

  return (
    <div>
      <div className="container">
        <div>
          <img src={ChairPic} alt="chairPic" />
          <div className="square" id="square0" role="presentation" />
          <div className="square" id="square1" role="presentation" />
          <div className="square" id="square2" role="presentation" />
          <div className="square" id="square3" role="presentation" />
        </div>
      </div>
      <div>
        <button type="button" id="submitButton" onClick={handlePressurePads}>
          Submit
        </button>
      </div>
      <div className="graph">
        <Graph />
      </div>
      <Footer />
    </div>
  );
}
export default Seat;
