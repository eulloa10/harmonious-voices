const LOAD_ALL = "servers/LOAD";
const OWNED = "servers/OWNED";
const BELONGS = "servers/BELONGS";
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

const loadBelongsSevers = (belongsServers) => ({
  type: BELONGS,
  belongsServers,
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
  const response = await fetch(`/api/servers`);

  if (response.ok) {
    const allServers = await response.json();
    console.log(allServers);
    dispatch(loadAllServers(allServers));
  }
};
// TODO make this end point
export const getOwnedServers = () => async (dispatch) => {
  const promise = await fetch("/api/servers/session/user");
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
export const addSever = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(add(server));
    return server;
  }
};

export const editSever = (server, serverId) => async (dispatch) => {
  console.log(server);
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(edit(server));
    return server;
  }
};

export const deleteAServer = (serverId) => async (dispatch) => {
  console.log(serverId);
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
  // list: []
};

const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL:
      const allServersQ = {};
      console.log(action);
      action.allServers.Servers.forEach((server) => {
        console.log(server);
        allServersQ[server.id] = server;
      });
      return {
        ...allServersQ,
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
