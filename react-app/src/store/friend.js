const LOAD = "friend/LOAD";
const CLEAR = "friend/CLEAR";

const load = (friend) => ({
  type: LOAD,
  friend,
});

const clear = () => ({
  type: CLEAR,
  friend: {},
});

export const loadFriendThunk = (name) => async (dispatch) => {
  const response = await fetch(`/api/users/find/${name}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  } else {
    dispatch(clear());
  }
};

const initialState = {};

const friendReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.friend;
    case CLEAR:
      return {};
    default:
      return newState;
  }
};

export default friendReducer;
