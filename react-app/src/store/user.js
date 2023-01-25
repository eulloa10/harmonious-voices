// import { csrfFetch } from './csrf'

export const GET_USERS = 'users/GET_USERS';
export const ADD_USER_SERVER = 'users/ADD_USER_SERVER';

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users/`);
  const data = await res.json();
  // console.log("FETCHED DATA", data)
  if (res.ok) {
    dispatch(getUsers(data.users));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const addUserToServer = (userId, serverId) => async (dispatch) => {
  const res = await fetch(`/api/server_member/${userId}/${serverId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, serverId }),
  });
};

export const removeUserFromServer = (userId, serverId) => async (dispatch) => {
  const res = await fetch(`/api/server_member/${userId}/${serverId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, serverId }),
  });
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = { ...initialState };
  switch (action.type) {
    case GET_USERS:
      newState = { ...state };
      // console.log("MESSAGESRED", action.users)
      action.users.forEach((user) => {
        // newState[user.id] = [user.username, user.user_profile_img];
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
