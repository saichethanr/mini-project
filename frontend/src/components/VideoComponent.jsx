import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import '../css/video.css';

function VideoStream1() {
  const [counter, setCounter] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/count_RHR');
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
      fetchStreak(email); // Fetch the updated streak after updating it
    } 
    catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  return (
    <div>
      <div className='streak-container'>
        <FontAwesomeIcon icon={faFire} className='fire-icon' />
        <h2 className='streak'>{streakCount}</h2>
      </div>
      <div className='v'>
        <iframe
          className='video'
          height={480}
          width={640}
          src={'http://127.0.0.1:5000/video_RHR'}
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className='count'>Counter: {counter}</h2>
      </div>
    </div>
  );
}

export default VideoStream1;
