import "../css/frame-component.css";

const FrameComponent = ({ strengthTrainingPowerLift }) => {
  return (
    <div className="strength-training-power-lifter-group">
      <div className="strength-training-power">{strengthTrainingPowerLift}</div>
      <div className="lorem-ipsum-is9">{`Lorem Ipsum is simply dummy text of the sai and typesetting industry. `}</div>
      <div className="buttom-32">
        <div className="buttom-3-inner" />
        <b className="learn-more5">Learn More</b>
      </div>
    </div>
  );
};

export default FrameComponent;
