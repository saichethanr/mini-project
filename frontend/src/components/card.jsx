import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import dumb from "../img/gym.jpg";
import CardDetail from "./CardDetail";

const Card = () => {
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate("/workout");
  };

  return (
    <div className="frame-div">
      <div className="starting-head">
        <h1 className="our">OUR </h1>
        <h1 className="plan">PLANS</h1>
      </div>

      <div className="frame-parent">
        <div className="vector-parent">
          <h2>Work Out</h2>
          <CardDetail />
          <div className="join-now" onClick={handleJoinNowClick}>
            Join Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
