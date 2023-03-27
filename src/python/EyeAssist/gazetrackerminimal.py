import cv2
from GazeTracking.gaze_tracking import GazeTracking
import datetime
import database as db
import time

mydb = db.conn_db()
gaze = GazeTracking()
webcam = cv2.VideoCapture(0)


class timer:
    def __init__(self):
        self.start = 0
        self.end = 0

    def start_timer(self):
        self.start = time.time()

    def elapsed_time(self):
        return time.time() - self.start


def looking_at_screen(threshold, data):
    """
    Take in a threshold value and take in data and return whether or not number of valid data exceeds threshold

    :param threshold: percentage of time we need to be looking at the screen to count as looking at the screen.
    :param data: data

    :results: bool
    """

    valid_data = 0
    for x in data:
        if x != None:
            valid_data += 1

    if len(data) == 0:
        result = 0
    else:
        result = valid_data / len(data)
    return result >= threshold


def score_vision(recording_time, visualise):
    """
    Records what you are looking at for recording_time seconds and gives you either a 1 for good or 0 for bad vision.

    :param recording_time: How long to record data for each measurement.
    :param visualise: Whether to visualise the eye tracking or not.
    """
    data = []
    t = timer()
    t.start_timer()

    # Record data for recording_time seconds
    while t.elapsed_time() <= recording_time:
        # We get a new frame from the webcam
        _, frame = webcam.read()

        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)
        frame = gaze.annotated_frame()
        if visualise:
            cv2.imshow("Demo", frame)

            if cv2.waitKey(1) == 27:
                break

        left_pupil = gaze.pupil_left_coords()
        right_pupil = gaze.pupil_right_coords()

        # Adding just 1 would probably be enough
        data.append(left_pupil)
        data.append(right_pupil)

    return looking_at_screen(0.8, data)


def upload_score(score):
    """
    Uploads the score to the database.

    :params score: The score
    """
    db.insert_data(mydb, [score, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")])


def score_and_upload(recording_time, visualise):
    """
    Gives a score for the vision and uploads it to the database

    :param recording_time: How long to record data for each measurement.
    :param visualise: Whether to visualise the eye tracking or not.
    """
    score = score_vision(recording_time, visualise)
    print(score)
    upload_score(score)


if __name__ == "__main__":
    while True:
        score_and_upload(5, True)
