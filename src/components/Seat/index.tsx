import React, { useState, useEffect } from 'react';
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
        console.log('in fetch');
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function changePressurePadColour(squareNumber: number, isPressed: boolean) {
    console.log(`chaning pressure pad colour ${squareNumber.toString()}`);
    const square = document.getElementById(`square${squareNumber.toString()}`);
    if (square) {
      console.log('square is not null');
      if (isPressed) {
        console.log('square is pressed');
        square.style.backgroundColor = 'darkred';
      } else {
        square.style.backgroundColor = 'white';
      }
    }
  }

  function handlePressurePads() {
    const lastThree = serverData.slice(
      serverData.length - 3,
      serverData.length
    );
    const lastThreePairs = lastThree.map((item) => ({
      sensor_id: item.sensor_id,
      data: item.data,
    }));

    for (let i = 0; i < lastThreePairs.length; i += 1) {
      const padNumber = lastThreePairs[i].sensor_id;
      const pressureData = lastThreePairs[i].data;
      console.log(padNumber);
      console.log(pressureData);

      let isPressed: boolean;
      console.log('pressure data');
      console.log(pressureData);
      if (pressureData !== 0) {
        isPressed = true;
      } else {
        isPressed = false;
      }
      console.log(`is pressed: ${isPressed.toString()}`);
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
      <Footer />
    </div>
  );
}
export default Seat;
