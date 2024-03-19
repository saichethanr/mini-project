import "../css/frame-component2.css";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FrameComponent2 = () => {
 
  const navigate=useNavigate();
  const isloggedin = localStorage.isloggedin;
  const handleSignup = (e) => {
    navigate(`/signup`);
  };

  const handleLogin = (e) => {
    navigate(`/login`);
  };  

  return (
    <nav class="navbar">
    <div class="navbar-brand">
      <b class="brand-text">GYM-EYE</b>
    </div>
    <div class="navbar-links">
      <ul>
        <li><a href="#" class="nav-link">Home</a></li>
        <li><a href="#" class="nav-link">Plans</a></li>
        <li><a href="#" class="nav-link">Contact</a></li>
      </ul>
    </div>
    <div class="navbar-login">
      {!isloggedin?(<><Link to='/login'><button className="login-text" onClick={handleLogin}>Login</button></Link><Link to='/signup'><button className="login-text" onClick={handleSignup}>Sign up</button></Link></>):<></>}
    
      
    </div>
  </nav>
  );
};

export default FrameComponent2;