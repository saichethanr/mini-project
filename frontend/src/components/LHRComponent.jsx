import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/video.css'

function LeftHandRaiseComponent() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/count_LHR');
        setCounter(response.data);
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    const interval = setInterval(fetchCounter, 1000); // Fetch counter every second
    return () => clearInterval(interval); // Cleanup function

  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <div className='v'>
        <iframe
          className='video'
          height={480}
          width={640}
          src={'http://127.0.0.1:5000/video_LHR'}
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className='count'>Counter: {counter}</h2>
      </div>
    </div>
  );
}

export default LeftHandRaiseComponent;
