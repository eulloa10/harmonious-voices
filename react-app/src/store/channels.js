const LOAD = "channels/LOAD";
const ADD = "channels/ADD";

const load = (channels) => ({
  type: LOAD,
  channels,
});

const add = (channel) => ({
  type: ADD,
  channel,
});

export const getAllChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`);

  if (response.ok) {
    const channels = await response.json();
    dispatch(load(channels));
  }
};

export const addChannel = (serverId, payload) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!data.error) {
    dispatch(add(data));
    return data;
  }
  return data;
};

const initialState = {};

const channelReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      const channels = {};
      action.channels.channels.forEach((channel) => {
        channels[channel.id] = channel;
      });
      return channels;
    case ADD:
      const { channel } = action;
      newState[channel.id] = channel;
      return newState;
    default:
      return state;
  }
};

export default channelReducer;
