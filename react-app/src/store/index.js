import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import channelReducer from "./channels";
import serverReducer from "./servers";
import directChannelReducer from "./directChannels";
import friendReducer from "./friend";
import session from "./session";
import messagesReducer from "./messages";
import usersReducer from "./user";

const rootReducer = combineReducers({
  session,
  servers: serverReducer,
  channels: channelReducer,
  directChannels: directChannelReducer,
  friend: friendReducer,
  messages: messagesReducer,
  users: usersReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
