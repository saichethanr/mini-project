import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/video.css';

function VideoStream2() {
  const [counter, setCounter] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0); // Add exerciseCount state

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
    if (counter >= 5) {
      const email = localStorage.getItem('email');
      if (email) {
        updateStreak(email);
      }
      setExerciseCount(counter); // Reset or update exercise count based on your logic
    }
  }, [counter]);

  const updateStreak = async (email) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/update_streak', { email });
      console.log(response.data.message);
    } 
    catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  return (
    <div>
      <div className='v'>
        <iframe
          className='video'
          height={480}
          width={640}
          src={'http://127.0.0.1:5000/video_SQUAT'}
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className='count'>Counter: {counter}</h2>
      </div>
    </div>
  );
}

export default VideoStream2;
