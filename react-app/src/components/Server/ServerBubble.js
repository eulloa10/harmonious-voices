import "./Servers.css";

const ServerBubble = ({ server }) => {
  const initials = server.name.split(" ").map((word) => word[0]);

  return (
    <div>
      {server.server_img ? (
        <div
          className={`server-icon-div ${server.id}`}
          style={{ backgroundImage: `url(${server.server_img})` }}
        ></div>
      ) : (
        <div>
          <p className={`server-icon-div ${server.id}`}>{initials.join("")}</p>
        </div>
      )}
    </div>
  );
};

export default ServerBubble;
