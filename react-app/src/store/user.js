// import { csrfFetch } from './csrf'

export const GET_USERS = 'users/GET_USERS';


const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
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


const initialState = {}

const usersReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case GET_USERS:
      newState = {...state};
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
