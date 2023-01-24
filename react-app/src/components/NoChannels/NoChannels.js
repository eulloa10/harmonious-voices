import image from "../../svgFiles/svgexport-31.svg";
import "./NoChannels.css";

const NoChannels = () => {
  return (
    <section className="no-channels-section">
      <div className="no-channels-container">
        <div className="no-channels-image-container">
          <img src={image} />
        </div>
        <div className="no-channels-text-container">
          <div className="no-channels-text-header">NO TEXT CHANNELS</div>
          <div className="no-channels-text">
            You find yourself in a strange place. You don't have access to any
            text channels, or there are none in this server.
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoChannels;
