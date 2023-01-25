import { Route, Switch } from 'react-router-dom';
import Channels from '../Channels';
import DirectMessaging from '../DirectMessaging';
import MessageList from '../Messages/MessageList/MessageList';
import ListOwnedServers from '../Server/ListOwnedServers';
import AllServers from '../Server/AllServers';
import './MainPage.css';
import NoChannels from '../NoChannels';
import { useState } from 'react';

const MainPage = () => {
  const [rerenderServers, setRerenderServers] = useState(false);

  return (
    <div className="main-page">
      <Switch>
        <Route path="/direct-messages/:channelId">
          <ListOwnedServers rerenderServers={rerenderServers} />
          <DirectMessaging />
          <MessageList />
        </Route>
        <Route path="/direct-messages">
          <ListOwnedServers rerenderServers={rerenderServers} />
          <DirectMessaging />
          <NoChannels />
        </Route>
        <Route path="/servers/:serverId/:channelId">
          <ListOwnedServers rerenderServers={rerenderServers} />
          <Channels />
          <MessageList />
        </Route>
        <Route path="/servers/:serverId">
          <ListOwnedServers rerenderServers={rerenderServers} />
          <Channels />
          <NoChannels />
        </Route>
        <Route path="/servers">
          <ListOwnedServers rerenderServers={rerenderServers} />
          <AllServers
            rerenderServers={rerenderServers}
            setRerenderServers={setRerenderServers}
          />
        </Route>
        <Route>
          <ListOwnedServers rerenderServers={rerenderServers} />
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
