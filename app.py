#camera feed
import cv2
#points generationn
import mediapipe as mp
import base64
from datetime import date
#comnnection with postgresql
from sqlalchemy import text
import threading
#flask is the backend
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
counter_LHR = 0
counter_PUSHUP = 0
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



def detect_rep_PushUp():
    global counter_PUSHUP
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

            height, width, _ = frame.shape
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(frame_rgb)

            if results.pose_landmarks is not None:
                landmarks = results.pose_landmarks.landmark
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * width,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * height]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x * width,
                         landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y * height]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x * width,
                         landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y * height]

                def calculate_angle(a, b, c):
                    a = np.array(a)
                    b = np.array(b)
                    c = np.array(c)
                    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
                    angle = np.abs(radians * 180.0 / np.pi)
                    if angle > 180.0:
                        angle = 360 - angle
                    return angle

                angle = calculate_angle(shoulder, elbow, wrist)

                if angle > 160:
                    up = True
                if up and not down and angle < 90:
                    down = True
                if up and down and angle > 160:
                    counter_PUSHUP += 1
                    up = False
                    down = False

                # Visualize the angle
                cv2.putText(frame, str(int(angle)),
                            tuple(np.multiply(elbow, [1, 1]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # Draw landmarks and connections
                mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

            # Display push-up count
            cv2.putText(frame, f'Push-ups: {counter_PUSHUP}', (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

            # Encode the frame for streaming
            _, jpeg = cv2.imencode('.jpg', frame)
            frame_bytes = jpeg.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

            # Break the loop if ESC key is pressed
            if cv2.waitKey(1) & 0xFF == 27:
                break

    cap.release()
    cv2.destroyAllWindows()
    
def detect_rep_LHR():
    global counter_LHR
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
        points = {}  # dictionary
        if result.pose_landmarks:
            mpDraw.draw_landmarks(img, result.pose_landmarks, mpPose.POSE_CONNECTIONS)
            for id, lm in enumerate(result.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                points[id] = (cx, cy)
            # Check the position of the left wrist (id 13) relative to the left shoulder (id 11)
            if not up and points[13][1] < points[11][1]:
                print("up")
                up = True
                counter_LHR += 1
            elif points[13][1] > points[11][1]:
                print("down")
                up = False
        _, jpeg = cv2.imencode('.jpg', img)
        frame_bytes = jpeg.tobytes()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    cap.release()
    cv2.destroyAllWindows()

@app.route('/video_LHR')
def video_LHR():
    return Response(detect_rep_LHR(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_LHR')
def get_count_LHR():
    global counter_LHR
    return str(counter_LHR)

@app.route('/video_PushUp')
def video_PushUp():
    return Response(detect_rep_PushUp(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_PushUp')
def get_count_PushUp():
    global counter_PUSHUP
    return str(counter_PUSHUP)

@app.route('/video_RHR')
def video_RHR():
    return Response(detect_rep_RHR(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_RHR')
def get_count_RHR():
    global counter_RHR
    cnt = counter_RHR
    return str(cnt)

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
    
@app.route('/update_streak', methods=['POST'])
def update_streak():
    data = request.json
    user_email = data.get('email')
  
    existing_user = db.session.execute(
        text("SELECT * FROM users WHERE email = :email"),
        {"email": user_email}
    ).fetchone()

    if existing_user:
        db_date = db.session.execute(
            text("SELECT lastday FROM streak WHERE email = :useremail"),
            {"useremail": user_email}
        ).fetchone()
        today = date.today()
        print(db_date)
        print(today)
        if db_date is not None and db_date[0] == today:
            return jsonify({"message": "Streak already updated"})
        
        existing_streak_entry = db_date

        if existing_streak_entry:
            # If the streak entry exists, update the lastday and increment the streak count if lastday is different from today
            if existing_streak_entry[0] != today:
                db.session.execute(
                    text("UPDATE streak SET lastday = :lastday, streak = streak + 1 WHERE email = :email"),
                    {"email": user_email, "lastday": today}
                )
            else:
                return jsonify({"message": "Streak already updated for today"})
        else:
            # If the streak entry does not exist, insert a new one
            db.session.execute(
                text("INSERT INTO streak (email, lastday, streak) VALUES (:email, :lastday, 1)"),
                {"email": user_email, "lastday": today}
            )
        db.session.commit()
        return jsonify({"message": "Streak updated successfully"})
    else:
        return jsonify({"error": "User does not exist"}), 404


@app.route('/streak_cnt', methods=['POST'])
def streak_cnt():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    try:
        streak_result = db.session.execute(
            text("SELECT streak FROM streak WHERE email = :email"),
            {"email": email}
        ).fetchone()
        
        if streak_result:
            streak_value = streak_result[0]
            return jsonify({'streak': streak_value})
        else:
            return jsonify({'error': 'Email not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    email = data.get('email')
    name = data.get('name')
    subject = data.get('subject')
    message = data.get('message')

    if not email or not name or not subject or not message:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    db.session.execute(
        text("INSERT INTO contact (email, name, subject, message) VALUES (:email, :name, :subject, :message)"),
        {"email": email, "name": name, "subject": subject, "message": message}
    )
    db.session.commit()

    return jsonify({'success': True, 'message': 'Message sent successfully'})

if __name__ == '__main__':
    app.run(debug=True)
