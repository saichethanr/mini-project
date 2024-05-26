import cv2
import mediapipe as mp
import base64
from sqlalchemy import text
import threading
from flask import Flask,Response,request,jsonify
from flask_socketio import SocketIO
from flask_cors import CORS,cross_origin
import numpy as np
from flask_sqlalchemy import SQLAlchemy
from math import acos, degrees

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sai:1445@127.0.0.1:5432/Gym'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

counter_RHR = 0
counter_SQUAT = 0

def detect_rep_RHR():
    global counter_RHR
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
        points = {}  #dicionary
        if result.pose_landmarks:
            mpDraw.draw_landmarks(img, result.pose_landmarks, mpPose.POSE_CONNECTIONS)
            for id, lm in enumerate(result.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                points[id] = (cx, cy)
            if not up and points[14][1] < points[12][1]:
                print("up")
                up = True
                counter_RHR += 1
            elif points[14][1] > points[12][1]:
                print("down")
                up = False
        _, jpeg = cv2.imencode('.jpg', img)
        frame_bytes = jpeg.tobytes()
        # frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    cap.release()
    cv2.destroyAllWindows()

def detect_rep_SQUAT():
    global counter_SQUAT
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    cap = cv2.VideoCapture(0)
    up = False
    down = False
    # Initialize Mediapipe Pose
    with mp_pose.Pose(static_image_mode=False) as pose:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # frame = cv2.flip(frame, 1)
            height, width, _ = frame.shape
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(frame_rgb)

        

            if results.pose_landmarks is not None:
                x1 = int(results.pose_landmarks.landmark[24].x * width)
                y1 = int(results.pose_landmarks.landmark[24].y * height)
                x2 = int(results.pose_landmarks.landmark[26].x * width)
                y2 = int(results.pose_landmarks.landmark[26].y * height)
                x3 = int(results.pose_landmarks.landmark[28].x * width)
                y3 = int(results.pose_landmarks.landmark[28].y * height)
                p1 = np.array([x1, y1])
                p2 = np.array([x2, y2])
                p3 = np.array([x3, y3])
                l1 = np.linalg.norm(p2 - p3)
                l2 = np.linalg.norm(p1 - p3)
                l3 = np.linalg.norm(p1 - p2)
                angle = degrees(acos((l1**2 + l3**2 - l2**2) / (2 * l1 * l3)))

                if angle >= 160:
                    up = True
                if up and not down and angle <= 70:
                    down = True
                if up and down and angle >= 160:
                    counter_SQUAT += 1
                    up = False
                    down = False

                # Draw lines and shapes on the frame
                aux_image = np.zeros(frame.shape, np.uint8)
                cv2.line(aux_image, (x1, y1), (x2, y2), (255, 255, 0), 20)
                cv2.line(aux_image, (x2, y2), (x3, y3), (255, 255, 0), 20)
                cv2.line(aux_image, (x1, y1), (x3, y3), (255, 255, 0), 5)
                contours = np.array([[x1, y1], [x2, y2], [x3, y3]])
                cv2.fillPoly(aux_image, pts=[contours], color=(128, 0, 250))
                output = cv2.addWeighted(frame, 1, aux_image, 0.8, 0)
                cv2.circle(output, (x1, y1), 6, (0, 255, 255), 4)
                cv2.circle(output, (x2, y2), 6, (128, 0, 250), 4)
                cv2.circle(output, (x3, y3), 6, (255, 191, 0), 4)
                cv2.rectangle(output, (0, 0), (60, 60), (255, 255, 0), -1)
                cv2.putText(output, str(int(angle)), (x2 + 30, y2), 1, 1.5, (128, 0, 250), 2)
                # cv2.putText(output, str(count), (10, 50), 1, 3.5, (128, 0, 250), 2)
                # cv2.imshow("output", output)

            # Break the loop if ESC key is pressed
            if cv2.waitKey(1) & 0xFF == 27:
                break
            _, jpeg = cv2.imencode('.jpg', output)
            frame_bytes = jpeg.tobytes()
            # frame_base64 = base64.b64encode(frame_bytes).decode('utf-8')
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    cap.release()
    cv2.destroyAllWindows()

# def detect_rep_PushUp():
#     # Initialize MediaPipe Pose.
#     mp_pose = mp.solutions.pose
#     pose = mp_pose.Pose()
#     mp_drawing = mp.solutions.drawing_utils

#     # Function to calculate angle between three points.
#     def calculate_angle(a, b, c):
#         a = np.array(a)
#         b = np.array(b)
#         c = np.array(c)
        
#         radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
#         angle = np.abs(radians * 180.0 / np.pi)
        
#         if angle > 180.0:
#             angle = 360 - angle
        
#         return angle

#     cap = cv2.VideoCapture(0)

#     pushup_count = 0
#     stage = None

#     while cap.isOpened():
#         ret, frame = cap.read()
        
#         if not ret:
#             break

#         # Convert the BGR image to RGB.
#         image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         image.flags.writeable = False
        
#         # Process the image and detect the pose.
#         results = pose.process(image)
        
#         # Recolor back to BGR for rendering.
#         image.flags.writeable = True
#         image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
#         # Extract landmarks.
#         try:
#             landmarks = results.pose_landmarks.landmark
            
#             # Get coordinates.
#             shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
#                         landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
#             elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
#                     landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
#             wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
#                     landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            
#             # Calculate the angle.
#             angle = calculate_angle(shoulder, elbow, wrist)
            
#             # Visualize the angle.
#             cv2.putText(image, str(angle),
#                         tuple(np.multiply(elbow, [640, 480]).astype(int)),
#                         cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            
#             # Pushup logic.
#             if angle > 160:
#                 stage = "up"
#             if angle < 90 and stage == "up":
#                 stage = "down"
#                 pushup_count += 1
#                 print(f"Pushup Count: {pushup_count}")
            
#         except:
#             pass
        
#         # Render detections.
#         mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
#         # Display the pushup count on the frame.
#         cv2.putText(image, f'Pushups: {pushup_count}', (10, 50), 
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        
#         # Display the resulting frame.
#         cv2.imshow('Pushup Counter', image)
        
#         if cv2.waitKey(10) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()
    


@app.route('/video_RHR')
def video_RHR():
    return Response(detect_rep_RHR(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_RHR')
def get_count_RHR():
    global counter_RHR
    return str(counter_RHR)

@app.route('/video_SQUAT')
def video_SQUAT():
    return Response(detect_rep_SQUAT(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_SQUAT')
def get_count_SQUAT():
    global counter_SQUAT
    return str(counter_SQUAT)




#handling the post requests
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('firstname')
    email = data.get('email')
    password = data.get('password')
    
    existing_user = db.session.execute(
        text("SELECT * FROM users WHERE email = :email"),
        {"email": email}
    ).fetchone()
    
    if existing_user:
        return jsonify(message="User already exists") 
    
    try:
        db.session.execute(
            text("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)"),
            {"name": name, "email": email, "password": password}
        )
        db.session.commit()
        return jsonify(message="User successfully registered")
    
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify(error=str(e)), 500
    
    

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('useremail')
    password = data.get('userpassword')
    
    existing_user = db.session.execute(
        text("SELECT * FROM users WHERE email = :email"),
        {"email": email}
    ).fetchone()
    
    if existing_user:
        stored_password = existing_user[2]  
        if stored_password==password:
            return jsonify(message="Success")
        else:
            return jsonify(message="Incorrect password")
    else:
        return jsonify(message="User does not exist")
    
  
    

if __name__ == '__main__':
    app.run(debug=True)
