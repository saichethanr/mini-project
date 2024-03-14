import FrameComponent2 from "./frame-component2";
import FrameComponent1 from "./frame-component1";
import FrameComponent from "./frame-component";
import Card from "./card";
import "../css/destop.css";
import leftMainImage from "../img/leftmain.png";
import RightMainImage from "../img/rightmain.png";
import BottomImage from "../img/bottom.png"
import CardCarousel from "./sponsors";
import cardData from './carddata';  
const Destop = () => {
  return (
    <div className="destop">
      <div className="destop-child" />
      <div className="destop-item" />
      <div className="destop-inner" />
      <div className="rectangle-div" />
      <FrameComponent2 />
      <div className="start-your-training-with-us-parent">
        <div className="start-your-training-container">
          <p className="start-your">START YOUR</p>
          <p className="training-with-us">
            <span>TRAINING</span>
            <span className="span">{` `}</span>
            <span className="with-us">WITH US</span>
          </p>
        </div>
        <div className="lorem-ipsum-is">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </div>
        <div className="get-strated-wrapper">
          <b className="get-strated">Get Strated</b>
        </div>
        <div className="rectangle-parent">
          <div className="frame-child" />
          <b className="get-strated">Learn More</b>
        </div>
      </div>
       <Card/>
      <div className="line-div" />
      <FrameComponent1 />
      <div className="destop-inner1">
        <div className="rggr-parent">
          <div className="rggr">
            <p className="start-your">{`WHY CHOOSE `}</p>
            <p className="start-your">US ?</p>
          </div>
          <div className="have-a-personal-trainer-parent">
            <div className="have-a-personal">Have a Personal Trainer</div>
            <img className="frame-child3" alt="" src="/group-51@2x.png" />
          </div>
          <div className="free-personal-trainer-for-new-parent">
            <div className="free-personal-trainer">
              Free Personal Trainer for New Members
            </div>
            <img className="frame-child3" alt="" src="/group-51@2x.png" />
          </div>
          <div className="free-supplements-for-every-new-parent">
            <div className="free-supplements-for">
              Free Supplements for Every New Member
            </div>
            <img className="frame-child3" alt="" src="/group-51@2x.png" />
          </div>
          <div className="open-24-hours-parent">
            <div className="open-24-hours">Open 24 Hours</div>
            <img className="frame-child3" alt="" src="/group-51@2x.png" />
          </div>
        </div>
      </div>
      <div className="shape-your-body-parent">
        <div className="shape-your-body-container">
          <p className="start-your">SHAPE YOUR</p>
          <p className="body">BODY</p>
        </div>
        <CardCarousel cardData={cardData} />

        <div className="buttom-1">
          <div className="buttom-1-child" />
          <b className="learn-more1">Learn More</b>
        </div>
      </div>
      <div className="instance-parent">
        <div className="strength-training-power-lifter-parent">
          <div className="strength-training-power-container">
            <p className="strength-training1">Strength Training</p>
            <p className="start-your">Power Lifter</p>
          </div>
          <div className="lorem-ipsum-is6">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}</div>
          <div className="buttom-3">
            <div className="buttom-1-child" />
            <b className="learn-more2">Learn More</b>
          </div>
        </div>
        <FrameComponent strengthTrainingPowerLift="Education for a Strong Life" />
        <FrameComponent strengthTrainingPowerLift="Healthy Food Education Body" />
        <FrameComponent strengthTrainingPowerLift="Healthy Drink Education" />
      </div>
      <div className="ellipse-div" />
      <img className="image-1-icon" alt="" src={leftMainImage} />
      <img className="image-2-icon" alt="" src={RightMainImage} />
      <img className="image-3-icon" alt="" src={BottomImage} />
    </div>
  );
};

export default Destop;
