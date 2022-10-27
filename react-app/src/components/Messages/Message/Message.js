import React, {useEffect} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedMessage } from '../../../store/messages';
import './Message.css'


const Message = ({ message }) => {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const currentPath = location.pathname;
  // const user = useSelector(state => state.session.user);

  // const deleteSpot = (e) => {
  //   dispatch(deleteSelectedMessage(message.id))
  //   e.preventDefault();
  // };

  // return (
  //   <>
  //   <li>
  //     <Link className="message-link" to={`/all/spots/${message.id}`}>
  //       <div className="message">
  //         <div>
  //           <img className="message-image" src={`${message.previewImage}`} alt="message"/>
  //         </div>
  //         <div>
  //           <div className="message-name">{message.name}</div>
  //           <div className="landing-city-state">{message.city}, {message.state}</div>
  //           <div className="night"><span className="message-price">${message.price}</span> night</div>
  //         </div>
  //       </div>
  //     </Link>

  //     {user && user.id === message.ownerId && currentPath === '/user/spots' &&
  //     (
  //     <div className="modify-spots-container">

  //       <Link className="edit-message" to={`/user/spots/${message.id}/edit`}><button className="edit-spots-btn">Edit</button></Link>

  //       <div className="delete-message">
  //       <button className="delete-spots-btn" onClick={deleteSpot}>Delete</button>
  //       </div>
  //     </div>
  //     )
  //     }
  //   </li>
  //   </>
  // );
  return (
    <h1>Message</h1>
  )
};

export default Message;
