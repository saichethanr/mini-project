import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const FrameComponent2 = () => {
  const navigate = useNavigate();
  const isloggedin = localStorage.isloggedin;
  const [streakCount, setStreakCount] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (isloggedin) {
      fetchStreak();
    }
  }, [isloggedin]);

  const fetchStreak = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await axios.post('http://127.0.0.1:5000/streak_cnt', { email });
      setStreakCount(response.data.streak);
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  const handleSignup = () => {
    navigate(`/signup`);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isloggedin');
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const styles = {
    navbar: {
      backgroundColor: 'rgba(46, 54, 60, 0)',
      padding: '15px 90px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 30,
      width: '100%',
      position: 'fixed',
    },
    navbarBrand: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    navbarLinks: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.8rem',
      transition: 'color 0.3s, padding 0.3s',
      marginLeft: '20px',
      padding: '40px',
    },
    navLinkHover: {
      color: '#1f31d7',
      paddingLeft: '50px',
    },
    navbarLogin: {
      color: '#000000',
      fontSize: '1.3rem',
      cursor: 'pointer',
      padding: '10px 20px',
      margin: '0 10px',
      backgroundColor: '#1f31d7',
      transition: 'background-color 0.3s',
    },
    navbarLoginHover: {
      backgroundColor: '#0f46ad',
    },
    fireIcon: {
      color: '#ff4500',
      marginRight: '10px',
      fontSize: '40px',
    },
    streakText: {
      margin: 0,
      fontSize: '1.3rem',
      color: '#FFFFFF',
    },
    streakContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
    },
    authContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarBrand}>
        <b className="brand-text">GYM-EYE</b>
      </div>
      <div className="navbar-links" style={styles.navbarLinks}>
        {['Home', 'Start', 'Contact'].map((link, index) => (
          <a
            key={link}
            href="#"
            className="nav-link"
            style={{
              ...styles.navLink,
              ...(hoverIndex === index ? styles.navLinkHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link}
          </a>
        ))}
      </div>
      <div className="auth-container" style={styles.authContainer}>
        {!isloggedin ? (
          <>
            <Link to='/login'>
              <button className="login-text" style={styles.navbarLogin} onClick={handleLogin}>Login</button>
            </Link>
            <Link to='/signup'>
              <button className="login-text" style={styles.navbarLogin} onClick={handleSignup}>Sign up</button>
            </Link>
          </>
        ) : (
          <>
            <div className="streak-container" style={styles.streakContainer}>
              <FontAwesomeIcon icon={faFire} className="fire-icon" style={styles.fireIcon} />
              <span className="streak-text" style={styles.streakText}>{streakCount}</span>
            </div>
            <button className="login-text" style={styles.navbarLogin} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default FrameComponent2;
