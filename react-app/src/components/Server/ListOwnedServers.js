import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getServers } from '../../store/servers';
// import ServerCard from './ServerCard';
import CreateSeverForm from './CreateServerForm';
// import CreateSongForm from './CreateSongForm';
// import SongDetail from './SongDetail';
// import Fab from './Fab';
// import './ListSongs.css'
// import Comments from '../Comments';

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
        dispatch(getServers());
        // dispatch(getBelongsServers());
    },[dispatch]);

    if (!myServers) {
        return null;
      }

    return (
        <main>
            <nav>
            {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
            <h3>All servers</h3>
                {myServers.map((server) => {
                    return(
                        <NavLink key={server.id} to={`/servers/${server.id}`}>
                            <div className='servers-container'>
                                <h2 className='servers-title'>{server.name}</h2>
                                {/* <ServerCard></ServerCard> */}
                                {/* <p className='song-description'>{song.description}</p> */}
                            </div>
                        </NavLink>
                    )
                })}
            </nav>
            {showForm ? (
            <CreateSeverForm hideForm={() => setShowForm(false)} />
            ) : (
            <Route path="/servers/:severId">
                <div className='server-detail'>
                    {/* <SongDetail/>
                    <Comments/> */}
                </div>
            </Route>
            )}
        </main>
    )
}

export default ListOwnedServers;
