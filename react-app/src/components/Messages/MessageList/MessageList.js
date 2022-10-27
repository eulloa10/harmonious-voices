import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../store/messages';
// import SpotIndexItem from '../SpotIndexItem/SpotIndexItem'
import './MessageList.css'


const MessageList = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages)
  const allMessagesList = [];

  for (let key in messages) {
    allMessagesList.push(messages[key]);
  }

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (!messages) {
    return null;
  }

  // return (
  //   <section className="all-messages">
  //     <ul className="allMessages">
  //       {
  //         allMessagesList.map(message => (
  //           <SpotIndexItem
  //             message={message}
  //             key={message.id}
  //           />
  //         ))
  //       }
  //     </ul>
  //     {/* <Link to="/books/new">Add New Book</Link>
  //     <button onClick={resetBookData}>Reset Book Data</button> */}
  //   </section>
  // );
  return (
    <h1>Message List</h1>
  )
}

export default MessageList;
