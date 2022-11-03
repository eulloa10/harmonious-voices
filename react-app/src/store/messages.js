// import { csrfFetch } from './csrf'

export const GET_MESSAGES = 'messages/GET_MESSAGES';
export const ADD_MESSAGE = 'messages/ADD_MESSAGES';
export const EDIT_MESSAGE= 'messages/EDIT_MESSAGES'
export const DELETE_MESSAGE = 'messages/DELETE_MESSAGES';
export const CLEAR_MESSAGES = 'messages/CLEAR_MESSAGES'


const getMessages = (messages) => {
  return {
    type: GET_MESSAGES,
    messages
  };
};

const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message
  }
}

const editMessage = (message) => {
  return {
    type: EDIT_MESSAGE,
    message
  }
}

const deleteMessage = (messageId) => {
  return {
    type: DELETE_MESSAGE,
    messageId
  }
}

const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  }
}


export const fetchMessages = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}/messages`);
  const data = await res.json();
  // console.log("FETCHED DATA", data)
  if (res.ok) {
    dispatch(getMessages(data.messages));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const createNewMessage = (message, channelId) => async(dispatch) => {

  const res = await fetch(`/api/channels/${channelId}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  } )

  if (res.ok) {
		const newMessage = await res.json();
		dispatch(addMessage(newMessage));
	}
  return res;
}

export const updateMessage = (message) => async (dispatch) => {
  // console.log("MESSAGEID", messageId, "MESSAGECONTENT", messageContent)
  const res = await fetch(`/api/messages/${message.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })

  if (res.ok) {
		const updatedMessage = await res.json();
		dispatch(editMessage(updatedMessage));
	}
  return res;
}

export const deleteSelectedMessage = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`, {
    method: 'DELETE',
  })

  if (res.ok) {
		dispatch(deleteMessage(messageId));
	}
  return res;
}

export const clearAllMessages = () => async (dispatch) => {
		dispatch(clearMessages());
}

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case GET_MESSAGES:
      newState = {...state};
      // console.log("MESSAGESRED", action.messages)
			action.messages.forEach((message) => {
				newState[message.id] = message;
			});
			return newState;
    case ADD_MESSAGE:
      newState = {...state};
      newState[action.message.id] = action.message
      return newState;
    case EDIT_MESSAGE:
      newState = {...state};
      newState[action.message.id] = action.message;
      return newState;
    case DELETE_MESSAGE:
      newState = {...state};
      delete newState[action.messageId];
      return newState;
    case CLEAR_MESSAGES:
      newState = {};
      return newState;
		default:
			return state;
	}
};

export default messagesReducer;
