import React from "react";
import "../css/card.css"; // Assuming you have a separate CSS file for styling

const Card = () => {
  return (
    <div className="frame-div">
      <div className="frame-parent">
        {/* First Card */}
        <div className="vector-parent">
          <img className="vector-icon" alt="" src="/vector.svg" />
          <div className="strength-training">Strength Training</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
          <img className="frame-item" alt="" src="/group-3.svg" />
        </div>

        {/* Second Card */}
        <div className="vector-parent">
          <img className="group-icon" alt="" src="/group.svg" />
          <div className="strength-training">Cardio Training</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
          <img className="frame-item" alt="" src="/group-3.svg" />
        </div>

        {/* Third Card (You can add more cards similarly) */}
        <div className="vector-parent">
          <img className="group-icon" alt="" src="/group.svg" />
          <div className="strength-training">Third Training</div>
          <div className="lorem-ipsum-is1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="join-now">Join Now</div>
          <img className="frame-item" alt="" src="/group-3.svg" />
        </div>
      </div>
    </div>
  );
};

export default Card;
