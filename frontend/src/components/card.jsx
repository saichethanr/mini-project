import React from "react";
import "../css/card.css"; // Assuming you have a separate CSS file for styling
import dumb from "../img/gym.jpg"
import CardDetail from "./CardDetail";
const Card = () => {
  return (
    <div className="frame-div">
      <div className="starting-head">
        <h1 className="our">OUR </h1>
        <h1 className="plan">PLANS</h1>
      </div>

      <div className="frame-parent">

        <div className="vector-parent">
          <h2>30 DAY PLAN</h2>
          <CardDetail/>
          <div className="join-now">Join Now</div>
      
        </div>


        <div className="vector-parent">
        <h2>60 DAY PLAN</h2>
         
        <CardDetail/>
          <div className="join-now">Join Now</div>
        </div>

        <div className="vector-parent">
        <h2>90 DAY PLAN</h2>
          <CardDetail/> 
          <div className="join-now">Join Now</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
