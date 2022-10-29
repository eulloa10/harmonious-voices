const LOAD_DIRECT_CHANNELS = "directChannels/LOAD";

const loadDirectChannels = (channels) => ({
  type: LOAD_DIRECT_CHANNELS,
  channels,
});

export const getDirectChannels = () => async (dispatch) => {
  const response = await fetch(`/api/me/channels`);

  if (response.ok) {
    const channels = await response.json();
    const directChannels = channels.directChannels;
    dispatch(loadDirectChannels(directChannels));
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
    default:
      return newState;
  }
};

export default directChannelReducer;
