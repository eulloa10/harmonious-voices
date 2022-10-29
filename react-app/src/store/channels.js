const LOAD = "channels/LOAD";
const ADD = "channels/ADD";
const EDIT = "channels/EDIT";
const DELETE = "channels/DELETE";

const load = (channels) => ({
  type: LOAD,
  channels,
});

const add = (channel) => ({
  type: ADD,
  channel,
});

const edit = (channel) => ({
  type: EDIT,
  channel,
});

const deleteChannel = (channel) => ({
  type: DELETE,
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

export const editChannel =
  (channelId, serverId, payload) => async (dispatch) => {
    const response = await fetch(
      `/api/servers/${serverId}/channels/${channelId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (!data.error) {
      dispatch(edit(data));
      return data;
    }
    return data;
  };

export const deleteChannelThunk = (channel, serverId) => async (dispatch) => {
  const response = await fetch(
    `/api/servers/${serverId}/channels/${channel.id}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    dispatch(deleteChannel(channel));
  }
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
    case EDIT:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE:
      console.log(action.channel.id);
      delete newState[action.channel.id];
      return newState;
    default:
      return state;
  }
};

export default channelReducer;
