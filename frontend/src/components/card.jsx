import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import CardDetail from "./CardDetail";

const Card = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('isloggedin') === 'true'; // Ensure this matches how you're storing the login status

  const handleJoinNowClick = () => {
    navigate("/workout");
  };

  return (
    <div className="main">
      <div className="parent">
        <div className="heading">
          Work Out
        </div>
        <div className="exercises">
          <CardDetail />
        </div>
        {isLoggedin ? (
          <div className="join-now" onClick={handleJoinNowClick}>
            Join Now
          </div>
        ) : (
          <div className="login-message">
            Login to start working out
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
