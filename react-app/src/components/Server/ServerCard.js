import "./Servers.css";

const ServerCard = ({ server }) => {
  const initials = server.name.split(" ").map((word) => word[0]);

  return (
    <div className="servercard-main-div">
      <div className="servercard-icon-div">
        {server.server_img ? (
          <img
            src={server.server_img}
            className="servercard-icon"
            alt="serverimage"
          ></img>
        ) : (
          <p className="servercard-icon">{initials.join("")}</p>
        )}
      </div>
      <div className="server-info-text">
        <div className="server-name">
          <p>{server.name}</p>
        </div>
        <div className="server-members">
          <i class="fa-solid fa-circle server-members-circle"></i>
          {server.members.length} members
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
