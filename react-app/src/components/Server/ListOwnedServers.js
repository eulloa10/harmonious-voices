import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getServers, getBelongsServers } from '../../store/servers';
import ServerCard from './ServerCard';
import CreateSeverForm from './CreateServerForm';
import Fab from './Fab';
import './Servers.css'
import Explore from '../../svgFiles/explore.svg'

export let myServers;
const ListOwnedServers = () => {
    const dispatch = useDispatch();

    // TODO update logic to not display all servers
    myServers = useSelector(state => {
        console.log(state);
        const serversArr = Object.values(state.servers)
        return serversArr
      });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        // dispatch(getServers());
        dispatch(getBelongsServers());
    },[dispatch]);

    if (!myServers) {
        return null;
      }

    return (
        <main>
            <nav>
            <h3>My servers</h3>
                <div>
                    <button className='custom-server'>DM</button>
                </div>
                {myServers.map((server) => {
                    return(
                        <NavLink key={server.id} to={`/servers/${server.id}`}>
                            <div className='servers-container'>
                                <ServerCard server={server}></ServerCard>
                            </div>
                        </NavLink>
                    )
                })}
                <div>
                    <button className='custom-server'> <img src={Explore}/> </button>
                </div>
                <Fab hidden={showForm} onClick={() => setShowForm(true)} />
            </nav>
            {showForm ? (
            <CreateSeverForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path="/servers/:severId">
                <div className='server-detail'>
                    {/* <ChannelDetailsComponentHeres/>*/}
                </div>
            </Route>
            )}
        </main>
    )
}

export default ListOwnedServers;
