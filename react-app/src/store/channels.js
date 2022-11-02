const LOAD_ALL = "serverChannels/LOAD";
const ADD = "serverChannels/ADD";
const EDIT = "serverChannels/EDIT";
const DELETE = "serverChannels/DELETE";

const loadServerChannels = (channels) => ({
  type: LOAD_ALL,
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

export const getServerChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`);

  if (response.ok) {
    const channels = await response.json();
    const serverChannels = channels.serverChannels;
    dispatch(loadServerChannels(serverChannels));
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
    await dispatch(add(data));
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
    case LOAD_ALL:
      const serverChannels = {};
      action.channels.forEach((channel) => {
        serverChannels[channel.id] = channel;
      });
      return serverChannels;
    case ADD:
      const { channel } = action;
      newState[channel.id] = channel;
      return newState;
    case EDIT:
      newState[action.channel.id] = action.channel;
      return newState;
    case DELETE:
      delete newState[action.channel.id];
      return newState;
    default:
      return state;
  }
};

export default channelReducer;
