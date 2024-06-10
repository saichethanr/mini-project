import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function VideoStream2() {
  const [counter, setCounter] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/count_SQUAT');
        setCounter(response.data);
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    const interval = setInterval(fetchCounter, 1000);
    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchStreak(email);
    }
  }, []);

  useEffect(() => {
    if (counter >= 5) {
      const email = localStorage.getItem('email');
      if (email) {
        updateStreak(email);
      }
      setExerciseCount(counter);
    }
  }, [counter]);

  const fetchStreak = async (email) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/streak_cnt', { email });
      setStreakCount(response.data.streak);
    } 
    catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  const updateStreak = async (email) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/update_streak', { email });
      console.log(response.data.message);
      fetchStreak(email);
    } 
    catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const styles = {
    body: {
      marginTop: 200,
      padding: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
    },
    v: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    video: {
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    count: {
      position: 'absolute',
      marginTop: 600,
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'black',
      backgroundImage: 'radial-gradient(circle, #1e3c72, #2a5298)',
      color: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    streakContainer: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center'
    },
    fireIcon: {
      color: '#ff4500',
      marginRight: '10px',
      fontSize: '40px'
    },
    streak: {
      margin: 0,
      fontSize: '40px',
      color: '#FFFFFF'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.streakContainer}>
        <FontAwesomeIcon icon={faFire} style={styles.fireIcon} />
        <strong style={styles.streak}>{streakCount}</strong>
      </div>
      <div style={styles.v}>
        <iframe
          style={styles.video}
          height={480}
          width={640}
          src={'http://127.0.0.1:5000/video_SQUAT'}
          allowFullScreen
        ></iframe>
      </div>
      <div style={styles.count}>
        <h2>Counter: {counter}</h2>
      </div>
    </div>
  );
}

export default VideoStream2;
