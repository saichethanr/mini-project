import React from "react";
import "../css/frame-component1.css"; // Assuming you have your CSS file imported
 // Import additional CSS file for footer styling

const FrameComponent1 = () => {
  return (
    <footer className="footer-container">
      <div className="destop-inner2">
        <div className="program-strength-training-card-parent">
          <div className="program-strength-training-container">
            <p className="program">
              <b>OUR PLANS</b>
            </p>
            <p className="strength-training">Strength Training</p>
            <p className="strength-training">Cardio Training</p>
            <p className="strength-training">Health Training</p>
            <p className="newsroom">Shape Body</p>
          </div>
          <div className="about-us-company-container">
            <p className="strength-training">
              <span>
                <b>About Us</b>
              </span>
            </p>
            <p className="strength-training">
              <span>
                <span>Company Info</span>
              </span>
            </p>
            <p className="business-area">
              <span>
                <span>Business Area</span>
              </span>
            </p>
            <p className="strength-training">
              <span>
                <span>Member</span>
              </span>
            </p>
            <p className="newsroom">
              <span>
                <span>Newsroom</span>
              </span>
            </p>
          </div>
          <b className="max-gym">
            <span>MAX-</span>
            <span className="gym">GYM</span>
          </b>
          <div className="lorem-ipsum-is8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FrameComponent1;
