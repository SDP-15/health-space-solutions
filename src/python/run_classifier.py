import serial
import re
import manual_classifier
from typing import List
import database
from datetime import datetime

# Global Variables
db = database.DB()
ser = serial.Serial("/dev/tty.HC-05", 9600)  # "/dev/ttyACM0" for dice machine
active_threshold = 300


def getData() -> List[int]:
    """
    Returns the latest reading for each sensor in a dictionary. Can be accessed by the id of the sensor.

    :return: dictionary with sensor id's as the keys and (sensor_id, sensor_reading, time_stamp) as the corresponding value
    """
    data = dict()
    while len(data) < 6:
        try:
            string = ser.readline().decode().strip()
            sensor_id, sensor_reading = re.search(
                r"reading(\d) = (\d+)", string
            ).groups()  # Sensor Id, pressure
            data[sensor_id] = (int(sensor_id), int(sensor_reading))
        except Exception as e:
            print(e)

            pass
    # Initialise with 0's
    ret_dat = [0, 0, 0, 0, 0, 0]
    for _, value in data.items():
        ret_dat[value[0]] = value[1]
    return ret_dat


while True:
    data = getData()
    score, reason = manual_classifier.score_posture(data, active_threshold)
    print("Score: " + str(score))
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    query = f"INSERT INTO score (score, timestamp, reason) VALUES({score}, '{timestamp}', {reason});"
    db.executeQuery(query)
