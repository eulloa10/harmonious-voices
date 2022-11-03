import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {editServer, deleteAServer} from '../../store/servers';
import EditSeverForm from './EditServerForm';
import './Servers.css'


const ContextMenu = ({top, left, contextedServerId, setEditForm}) => {
    const [contextSelectedAction, setContextSelectedAction] = useState('');
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const [showForm, setShowForm] = useState(false);


    const handleClick = (e) => {
        //TODO: updating buttons
        e.preventDefault();
        console.log(e.target);
        console.log('contexted', contextedServerId);
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
            console.log(deleteAServer(contextedServerId));
            dispatch(deleteAServer(contextedServerId))
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
