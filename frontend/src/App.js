import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import VideoStream1 from './components/VideoComponent';
import VideoStream2 from './components/SquatComponent';
import Destop from './components/destop';
import './css/App.css';
import SignUp from './pages/SignUp';
import Login from "./pages/Login"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Destop/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

