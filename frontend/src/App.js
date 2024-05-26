import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import VideoStream1 from './components/VideoComponent';
import VideoStream2 from './components/SquatComponent';
import Destop from './components/destop';
import './css/App.css';
import SignUp from './pages/SignUp';
import Login from "./pages/Login"
import WorkOut from './pages/WorkOut';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<VideoStream2/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/workout" element={<WorkOut/>}></Route>
      <Route path="/squat" element={<VideoStream2/>}></Route>
      <Route path="/lhr" element={<WorkOut/>}></Route>
      <Route path="/rhr" element={<VideoStream1/>}></Route>
      <Route path="/pushup" element={<WorkOut/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

