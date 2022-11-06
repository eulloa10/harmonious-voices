import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import MainPage from "./components/MainPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const cur = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        {loaded && cur ? (
          <Route path="/">
            <MainPage />
          </Route>
        ) : (
          <Route path="/">
            <SplashPage />
          </Route>
        )}
      </BrowserRouter>
    </>

    // // <BrowserRouter>
    //   {/* <Switch>
    //     <Route path="/explore/servers">
    //       <ListAllServers />
    //     </Route>
    //     <Route path="/login">
    //       <LoginForm />
    //     </Route>
    //     <Route path="/me">
    //       <ListOwnedServers />
    //     </Route>
    //     <Route path="/channels/me">
    //       <DirectMessaging />
    //     </Route>
    //     <Route path="/:serverId/channels">
    //       <Channels />
    //     </Route>
    //     <Route path="/servers">
    //       <ListAllServers />
    //     </Route>
    //     <Route exact path="/channels/:channelId/messages">
    //       <MessageList />
    //     </Route>
    //     <Route path="/">
    //       <SplashPage />
    //     </Route>
    //   </Switch> */}
    //   {/* <Route path="/servers">
    //       <ListOwnedServers></ListOwnedServers>
    //     </Route>
    //     <ProtectedRoute path="/users" exact={true}>
    //       <UsersList />
    //     </ProtectedRoute>
    //     <ProtectedRoute path="/users/:userId" exact={true}>
    //       <User />
    //     </ProtectedRoute>
    //     <ProtectedRoute path="/" exact={true}>
    //       <h1>My Home Page</h1>
    //     </ProtectedRoute>
    //   </Switch> */}
    // {/* </BrowserRouter> */}
  );
}

export default App;
