import cv2
import mediapipe as mp
import base64
import threading
from flask import Flask, render_template,Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
counter = 0

def detect_rep():
    global counter
    mpDraw = mp.solutions.drawing_utils
    mpPose = mp.solutions.pose
    pose = mpPose.Pose()
    cap = cv2.VideoCapture(0)
    up = False
    while True:
        success, img = cap.read()
        if not success:
            break
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = pose.process(imgRGB)
        points = {}
        if result.pose_landmarks:
            mpDraw.draw_landmarks(img, result.pose_landmarks, mpPose.POSE_CONNECTIONS)
            for id, lm in enumerate(result.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                points[id] = (cx, cy)
            if not up and points[14][1] < points[12][1]:
                print("up")
                up = True
                counter += 1
            elif points[14][1] > points[12][1]:
                print("down")
                up = False
        print(counter)
        _, jpeg = cv2.imencode('.jpg', img)
        frame_bytes = jpeg.tobytes()
        # frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    cap.release()
    cv2.destroyAllWindows()


@app.route('/video')
def video():
    return Response(detect_rep(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count')
def get_count():
    global counter
    return str(counter)

if __name__ == '__main__':
    app.run(debug=True)
