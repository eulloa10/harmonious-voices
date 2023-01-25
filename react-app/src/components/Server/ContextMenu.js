import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAServer } from '../../store/servers';
import { removeUserFromServer } from '../../store/user';
import './Servers.css';

export let clicked = 0;

const ContextMenu = ({
  top,
  left,
  contextedServerId,
  setEditForm,
  setOwnedServers,
}) => {
  const [contextSelectedAction, setContextSelectedAction] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleClick = (e) => {
    e.preventDefault();
    setContextSelectedAction(e.target.innerText);
  };
  useEffect(() => {
    if (contextSelectedAction === '') {
      return;
    } else if (contextSelectedAction === 'Edit') {
      setEditForm(true);
    } else if (contextSelectedAction === 'Delete') {
      dispatch(deleteAServer(contextedServerId));
      clicked = Math.random();
      history.push('/servers');
    } else if (contextSelectedAction === 'Leave') {
      dispatch(removeUserFromServer(user.id, contextedServerId));
      clicked = Math.random();
    } else {
      return { Message: 'Selected from item (from ContextMenu)' };
    }
  }, [contextSelectedAction, dispatch, setEditForm, contextedServerId]);

  return (
    <>
      <div className="context-menu" style={{ top, left }}>
        <ul
          className="context-menu-list"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <li>Edit</li>
          <li>Delete</li>
          <li>Leave</li>
        </ul>
      </div>
      {/* {showForm && (
        // <EditSeverForm hideForm={() => setShowForm(false)} />
        <div>testing</div>
      )} */}
    </>
  );
};

export default ContextMenu;
