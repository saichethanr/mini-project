import React from 'react';
import VideoStream1 from './components/VideoComponent';
import VideoStream2 from './components/SquatComponent';
import Destop from './components/destop';
import './css/App.css';
function App() {
  return (
    <div className="App">
      <h1>REP COUNTER</h1>
      <VideoStream2/>
    {/* <Destop/> */}
    </div>
  );
}

export default App;

// import React from 'react';
// // import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <video src={'/video'} className="App-logo" alt="logo" />
//       </header>
//     </div>
//   );
// }

// export default App;