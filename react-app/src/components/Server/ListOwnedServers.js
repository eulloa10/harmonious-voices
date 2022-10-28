import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getServers, getBelongsServers } from '../../store/servers';
import ServerCard from './ServerCard';
import CreateSeverForm from './CreateServerForm';
import Fab from './Fab';
import './Servers.css'
import Explore from '../../svgFiles/explore.svg'

const ListOwnedServers = () => {
    const dispatch = useDispatch();

    let myServers = useSelector(state => {
        console.log(state);
        const serversArr = Object.values(state.servers)
        return serversArr
      });
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        // dispatch(getServers());
        dispatch(getBelongsServers());
    },[dispatch]);

    useEffect(() => {

    },[])

    return (
        <main>
            <nav>
                <div>

                    <NavLink to='/directMessages' className='server-icon-div dm server-icon'>DM</NavLink>
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
                    <NavLink to={`/explore/servers`} className='server-icon-div'>
                        <img src={Explore}/>
                    </NavLink>
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
