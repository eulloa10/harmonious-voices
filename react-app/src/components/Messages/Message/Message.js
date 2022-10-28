import React, {useEffect} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedMessage } from '../../../store/messages';
import { fetchUsers } from '../../../store/user';
import './Message.css'


const Message = ({ message }) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const users = useSelector(state => state.users);
  const allUsersList = [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  for (let key in users) {
    allUsersList.push(users[key]);
  }

  console.log("ALLUSERSLIST ->", allUsersList)


  // const deleteMessage = (e) => {
  //   dispatch(deleteSelectedMessage(message.id))
  //   e.preventDefault();
  // };


  return (
    <>
    {/* <li> */}
    <li>
        <div className="message">
          <div>
            <div>
              {message.user_id}
              {message.date_created}
            </div>

            {message.content}
          </div>
        </div>
    </li>

      {/* {user && user.id === message.ownerId && currentPath === '/user/spots' &&
      (
      <div className="modify-spots-container">

        <Link className="edit-message" to={`/user/spots/${message.id}/edit`}><button className="edit-spots-btn">Edit</button></Link>

        <div className="delete-message">
        <button className="delete-spots-btn" onClick={deleteMessage}>Delete</button>
        </div>
      </div>
      )
      }
    </li> */}
    </>
  );

};

export default Message;
