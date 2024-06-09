import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/App.css'

function PushUpComponent() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/count_PushUp');
        setCounter(response.data);
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    const interval = setInterval(fetchCounter, 1000); 
    return () => clearInterval(interval); 

  }, []);

  return (
    <div>
      <div className='v'>
        <iframe
          className='video'
          height={480}
          width={640}
          src={'http://127.0.0.1:5000/video_PushUp'}
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className='count'>Counter: {counter}</h2>
      </div>
    </div>
  );
}

export default PushUpComponent;
