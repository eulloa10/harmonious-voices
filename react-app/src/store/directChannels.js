const LOAD_DIRECT_CHANNELS = "directChannels/LOAD";
const ADD = "directChannels/ADD";
const DELETE = "directChannels/DELETE";

const loadDirectChannels = (channels) => ({
  type: LOAD_DIRECT_CHANNELS,
  channels,
});

const add = (channel) => ({
  type: ADD,
  channel,
});

const deleteChannel = (channelId) => ({
  type: DELETE,
  channelId,
});

export const getDirectChannels = () => async (dispatch) => {
  const response = await fetch(`/api/me/channels`);

  if (response.ok) {
    const channels = await response.json();
    const directChannels = channels.directChannels;
    dispatch(loadDirectChannels(directChannels));
  }
};

export const addDirectChannel = (payload) => async (dispatch) => {
  const response = await fetch(`/api/me/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const channel = await response.json();
    await dispatch(add(channel));
    return channel;
  }
};

export const deleteDirectChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/me/channels/${channelId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteChannel(channelId));
  }
};

const initialState = {};

const directChannelReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_DIRECT_CHANNELS:
      const directChannels = {};
      action.channels.forEach((channel) => {
        directChannels[channel.id] = channel;
      });
      return directChannels;
    case ADD:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE:
      delete newState[action.channelId];
      return newState;
    default:
      return newState;
  }
};

export default directChannelReducer;
