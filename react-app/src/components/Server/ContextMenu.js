import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {editServer, deleteAServer} from '../../store/servers';
import EditSeverForm from './EditServerForm';
import './Servers.css'


const ContextMenu = ({top, left, contextedServerId, setEditForm, setOwnedServers}) => {
    const [contextSelectedAction, setContextSelectedAction] = useState('');
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const [showForm, setShowForm] = useState(false);
    const history = useHistory();


    const handleClick = (e) => {
        e.preventDefault();
        setContextSelectedAction(e.target.innerText)
    }
    useEffect(() => {
        if(contextSelectedAction === ''){
            return;
        }
        else if (contextSelectedAction === 'Edit'){
            setEditForm(true)
            console.log('in the edit function');
        }else if (contextSelectedAction === 'Delete'){
            dispatch(deleteAServer(contextedServerId));
            // history.push('/servers')
        }
        else{
            return{'Message': 'Selected from item (from ContextMenu)'}
        }
      }, [contextSelectedAction, showForm]);

    return (
        <>
            <div className="context-menu" style={{top, left}}>
                <ul className='context-meneu-list'  onClick={(e) => {handleClick(e)}}>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            </div>
            {
                showForm &&
                // <EditSeverForm hideForm={() => setShowForm(false)} />
                <div>testing</div>
            }
        </>
    )
}

export default ContextMenu;
