import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import NavBar from "./components/SplashPage/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import MessageList from "./components/Messages/MessageList/MessageList";
import { authenticate } from "./store/session";
import ListOwnedServers from "./components/Server/ListOwnedServers";
import SplashPage from "./components/SplashPage";
import MeTest from "./components/MeTest/MeTest.js";
import DirectMessaging from "./components/DirectMessaging";
import ListAllServers from "./components/Server/ListAllServers";
import AllServers from "./components/Server/AllServers";
import Channels from "./components/Channels";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cur = useSelector(state => state.session.user)

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
          <Switch>
            <Route path='/servers/:serverId/:channelId'>
              <ListOwnedServers/>
              <Channels/>
              <MessageList/>
            </Route>
            <Route path='/servers/:serverId'>
              <ListOwnedServers/>
              <Channels/>
            </Route>
            <Route path='/servers'>
            <ListOwnedServers/>
              <AllServers/>
            </Route>
            <Route>
              <ListOwnedServers/>
            </Route>
          </Switch>
        ):(
          <>
            <Route exact path='/'>
              <SplashPage></SplashPage>
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignUpForm/>
            </Route>
          </>
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
