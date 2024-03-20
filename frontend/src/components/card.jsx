import React from "react";
import "../css/card.css"; // Assuming you have a separate CSS file for styling
import dumb from "../img/gym.jpg"
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
          <div className="lorem-ipsum-is1">
            <ul>
              <li>40 Squat/day</li>
              <li>45 ShoulderPress/day</li>
              <li>2 min Plank/day</li>
              <li>30 PushUps/day</li>
            </ul>
          </div>
          <div className="join-now">Join Now</div>
      
        </div>


        <div className="vector-parent">
        <h2>60 DAY PLAN</h2>
         
          <div className="lorem-ipsum-is1">
          <ul>
              <li>40 Squat/day</li>
              <li>45 ShoulderPress/day</li>
              <li>2 min Plank/day</li>
              <li>30 PushUps/day</li>
            </ul>
          </div>
          <div className="join-now">Join Now</div>
        </div>

        <div className="vector-parent">
        <h2>90 DAY PLAN</h2>
          <div className="lorem-ipsum-is1">
          <ul>
              <li>40 Squat/day</li>
              <li>45 ShoulderPress/day</li>
              <li>2 min Plank/day</li>
              <li>30 PushUps/day</li>
            </ul>
          </div>
          <div className="join-now">Join Now</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
