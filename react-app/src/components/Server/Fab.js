import "./Servers.css";

const Fab = (props) => {
  return (
    <div
      className={props.hidden ? "fab is-hidden" : "fab"}
      onClick={props.onClick}
    >
      <div aria-label="add" role="img" className="add-icon-div">
        <i className="fa-solid fa-plus add-icon"></i>
      </div>
    </div>
  );
};

export default Fab;
