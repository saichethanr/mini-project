import "../css/frame-component2.css";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FrameComponent2 = () => {
 
  const navigate = useNavigate();
  const isloggedin = localStorage.isloggedin;
  const handleSignup = (e) => {
    navigate(`/signup`);
  };

  const handleLogin = (e) => {
    navigate(`/login`);
  };  

  const handleLogout = () => {
    localStorage.removeItem('isloggedin');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <b className="brand-text">GYM-EYE</b>
      </div>
      <div className="navbar-links">
        <ul>
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">Start</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-login">
        {!isloggedin ? (
          <>
            <Link to='/login'>
              <button className="login-text" onClick={handleLogin}>Login</button>
            </Link>
            <Link to='/signup'>
              <button className="login-text" onClick={handleSignup}>Sign up</button>
            </Link>
          </>
        ) : (
          <button className="login-text" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default FrameComponent2;
