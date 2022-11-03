import { Route, Switch } from "react-router-dom";
import Channels from "../Channels";
import DirectMessaging from "../DirectMessaging";
import MessageList from "../Messages/MessageList/MessageList";
import ListOwnedServers from "../Server/ListOwnedServers";
import AllServers from "../Server/AllServers";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <Switch>
        <Route path="/direct-messages/:channelId">
          <ListOwnedServers />
          <DirectMessaging />
          <MessageList />
        </Route>
        <Route path="/direct-messages">
          <ListOwnedServers />
          <DirectMessaging />
        </Route>
        <Route path="/servers/:serverId/:channelId">
          <ListOwnedServers />
          <Channels />
          <MessageList />
        </Route>
        <Route path="/servers/:serverId">
          <ListOwnedServers />
          <Channels />
        </Route>
        <Route path="/servers">
          <ListOwnedServers />
          <AllServers />
        </Route>
        <Route>
          <ListOwnedServers />
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
