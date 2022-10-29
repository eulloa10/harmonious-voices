import Add from '../../svgFiles/add.svg'
import './Servers.css'

const Fab = props => {
    return (
      <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
        <div aria-label="add" role="img" className="server-icon-div"><img src={Add}/> </div>
      </div>
    );
  };

  export default Fab;
