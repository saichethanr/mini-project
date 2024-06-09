import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/SignUp.css';

function SignUp() {
  const [firstname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mess, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        firstname,
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === "User successfully registered") {
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="signup">
        <div className="signup-container">
          <h2>Sign Up</h2> {/* Added Sign Up heading */}
          <form onSubmit={handleSubmit}>
            <div className="signup-fields">
              <input
                type="text"
                id="firstname"
                placeholder="Name"
                value={firstname}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="signup-fields">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-fields">
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-fields">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
          <h2>{mess}</h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
