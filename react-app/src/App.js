import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import NavBar from "./components/SplashPage/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import ListOwnedServers from "./components/Server/ListOwnedServers";
import SplashPage from "./components/SplashPage";
import MeTest from "./components/MeTest/MeTest.js";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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
    <BrowserRouter>
      <Switch>
        <Route path="/me">
          <MeTest />
        </Route>
        <Route path='/servers'>
          <ListOwnedServers></ListOwnedServers>
        </Route>
        <Route exact path="/">
          <SplashPage />
        </Route>
      </Switch>
      {/* <Switch> */}
      {/* <Route path="/servers">
          <ListOwnedServers></ListOwnedServers>
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch> */}
    </BrowserRouter>
  );
}

export default App;
