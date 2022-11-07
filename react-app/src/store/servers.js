const LOAD_ALL = "servers/LOAD";
const OWNED = "servers/OWNED";
const JOINED = "servers/JOINED";
const EDIT = "servers/EDIT";
const ADD = "servers/ADD";
const DELETE = "servers/DELETE";

const loadAllServers = (allServers) => ({
  type: LOAD_ALL,
  allServers,
});

const loadOwnedSevers = (ownedServers) => ({
  type: OWNED,
  ownedServers,
});

const loadJoinedSevers = (joinedServers) => ({
  type: JOINED,
  joinedServers,
});

const edit = (server) => ({
  type: EDIT,
  server,
});

const add = (server) => ({
  type: ADD,
  server,
});

const deleteServer = (id) => ({
  type: DELETE,
  id,
});

export const getServers = () => async (dispatch) => {
  const response = await fetch(`/api/servers/`);

  if (response.ok) {
    const allServers = await response.json();
    dispatch(loadAllServers(allServers));
  }
};
export const getJoinedServers = () => async (dispatch) => {
  const promise = await fetch("/api/servers/me");
  if (promise.ok) {
    const promisedSevers = await promise.json();
    dispatch(loadJoinedSevers(promisedSevers));
  }
};
export const getOwnedServers = () => async (dispatch) => {
  const promise = await fetch("/api/servers/owned");
  if (promise.ok) {
    const promisedSevers = await promise.json();
    dispatch(loadOwnedSevers(promisedSevers));
  }
};

export const getServerById = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    dispatch(add(server));
  }
};
export const addServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: server,
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(add(server));
    return server;
  }
};

export const editServer = (server, serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    body: server,
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(edit(server));
    return server;
  }
};

export const deleteAServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const returnValue = response.json();
    dispatch(deleteServer(serverId));
    return returnValue;
  }
};

const initialState = {
  owned: {},
  joined: {},
  allServers: {},
};

const serverReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOAD_ALL:
      const allServersQ = {};
      action.allServers.Servers.forEach((server) => {
        allServersQ[server.id] = server;
      });
      state.allServers = { ...allServersQ };
      return {
        ...state,
      };

    case OWNED:
      const ownedServers = {};
      action.ownedServers.OwnedServers.forEach((server) => {
        ownedServers[server.id] = server;
      });
      state.owned = { ...ownedServers };
      return {
        ...state,
      };

    case JOINED:
      const joinedServers = {};
      action.joinedServers.MyServers.forEach((server) => {
        joinedServers[server.id] = server;
      });
      state.joined = { ...joinedServers };
      return {
        ...state,
      };

    case ADD:
      if (!state[action.server.id]) {
        const newState = {
          ...state,
          [action.server.id]: action.server,
        };
        return newState;
      }
      return {
        ...state,
        [action.server.id]: {
          ...state[action.server.id],
          ...action.server,
        },
      };
    case DELETE:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case EDIT:
      return {
        ...state,
        [action.server.id]: action.server,
      };
    default:
      return state;
  }
};

export default serverReducer;
