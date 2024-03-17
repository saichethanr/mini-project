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
          <img className="vector-icon" alt="" src={dumb} />
          <div className="strength-training">30 DAY PLAN</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
      
        </div>


        <div className="vector-parent">
          <img className="group-icon" alt="" src="/group.svg" />
          <div className="strength-training">60 DAY PLAN</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
        </div>

        <div className="vector-parent">
          <img className="group-icon" alt="" src="/group.svg" />
          <div className="strength-training">90 DAY PLAN</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
