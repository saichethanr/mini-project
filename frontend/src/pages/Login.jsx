import React, { useState } from 'react';
import Axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  function register() {
    Axios.post("http://127.0.0.1:5000/login", { useremail: email, userpassword: password }).then((response) => {
      console.log(response.data.message);
      setMessage(response.data.message);
      console.log(email);
  
      if (response.data.message === "Success") {
        localStorage.setItem("email", email);
        if (email === "admin@gmail.com") {
          navigate('/admin');
        } else {
          navigate('/');
          localStorage.setItem("isloggedin", true);
          console.log(localStorage);
        }
      }
    });
  }
  

  return (
    <div>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h2>Login</h2> {/* Added login header */}
          <form>
            <div className="loginsignup-fields">
              <input
                type="email"
                onChange={(event) => { setEmail(event.target.value); }}
                placeholder='Email Address'
              />
              <input
                type="password"
                onChange={(event) => { setPassword(event.target.value); }}
                placeholder='Password'
              />
            </div>
          </form>
          <button type="submit" onClick={register}>Login</button>
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
