"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""

import cv2
from gaze_tracking import GazeTracking
import sys
import time
import asyncio
import websockets

gaze = GazeTracking()
webcam = cv2.VideoCapture(0) # 0 for second camera, 1 for laptop camera when theres 2 cameras

#read in input variables, TODO: will be read in instead of hardcoded
#USER SET : how long the user can look at the screen for in minutes
screenlimit = 1 

#USER SET : how long user should look away from the screen for in seconds
screenbreak = 20

#if the user dismisses the popup to look away
popup_dismiss = False

#variables
#total number of frames read from
i = 0 

#stores all the data gathered from both right and left eye every frame
data = []

#stores the time user has spent looking at screen in minutes
screentime = 0 

#determines whether or not a popup should come up onto the users screen to advise them to take a break
popup = False 

#with this we can pause and run the script as necessary
collect_data = True

#print logs to help debug
textfile = open("debugging.txt", "w")

textfile.write("before definitions"+'\n')

#functions
def looking_at_screen(threshold, data):
    """Take in a threshold value like 0.8 and take in data and return whether or not
    number of valid data exceeds threshold"""

    valid_data = 0
    for x in data:
        if x != None:
            valid_data += 1

    result = valid_data/len(data)

    return (result>=threshold)

# called whenever message received from js
async def handle_message(websocket, message):
    # print(f"Received message from js: {message}")
    textfile.write("Received message from js: " + message)
    
# called to send message to js
async def send_message(websocket, message):
    await websocket.send(message)
    # print(f"Sent message to js: {message}")
    textfile.write("Sent message to js: " + message)
    
# sends "start" message after 5s delay
async def send_start_message(websocket, message):
    #await asyncio.sleep(5)
    await send_message(websocket, message)

# main function called whenever js connects to server
async def server(websocket, path):
    print("Client connected!")

    while True:
        i += 1

        # We get a new frame from the webcam
        _, frame = webcam.read()
        
        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)

        frame = gaze.annotated_frame()
        text = ""

        # if gaze.is_blinking():
        #     text = "Blinking"
        if gaze.is_right():
            text = "Looking right"
        elif gaze.is_left():
            text = "Looking left"
        elif gaze.is_center():
            text = "Looking center"

        cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

        left_pupil = gaze.pupil_left_coords()
        right_pupil = gaze.pupil_right_coords()
        cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
        cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

        cv2.imshow("Demo", frame)

        data.append(left_pupil)
        data.append(right_pupil)
        
        #run every minute
        if i%1800 == 0: #1800= 30 frames per second * 60 seconds in a minute
            log_and_check_screentime(websocket)

        # live video stream
        if cv2.waitKey(1) == 27:
            break
    


#should run every minute
async def log_and_check_screentime(websocket):
    #if user has been recorded as looking at their screen for 80% of the time
    if looking_at_screen(0.8, data):
        #update screentime by 1 minute
        screentime += 1
    
    #reset data
    data = []
    
    message = "screentime: " + str(screentime)

    #if user has reached screenlimit, need to send message to js to send an alert
    if screentime%screenlimit==0 and screentime != 0: 
        #update and send new message
        new_message = "popup " + message
        asyncio.create_task(send_start_message(websocket, new_message))
        #then wait until recieved message that the popup is closed
        async for receivemsg in websocket:
            # when a message is received, calls handle message to process message
            await handle_message(websocket, receivemsg)
            time.sleep(screenbreak)
    else:
        #send message without waiting
        asyncio.create_task(send_start_message(websocket, message))
        
                
textfile.write("before websocket"+'\n')

# create websocket
start_server = websockets.serve(server, "localhost", 8765)

textfile.write("before event loop run until complete"+'\n')
# runs event loop
asyncio.get_event_loop().run_until_complete(start_server)

textfile.write("before event loop run forever"+'\n')
asyncio.get_event_loop().run_forever()

textfile.write("finished")


    
    
# webcam.release()
# cv2.destroyAllWindows()