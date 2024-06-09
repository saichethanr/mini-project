import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import CardDetail from "./CardDetail";

const Card = () => {
  const navigate = useNavigate();
  const isloggedin = localStorage.isloggedin;

  const handleJoinNowClick = () => {
    navigate("/workout");
  };

  return (
    <div className="main">

    <div className="parent">
      <div className="heading">
        Work Out
      </div>
      <div className="excercises">
        <CardDetail />
      </div>
      <div className="join-now" onClick={handleJoinNowClick}>
          Join Now
      </div>
    </div>
    </div>
  );
};

export default Card;
