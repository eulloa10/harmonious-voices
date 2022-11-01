import './Servers.css'

const ContextMenu = ({top, left}) => {
    return (
        <div className="context-menu" style={{top, left}}>
            <ul className='context-meneu-list'>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    )
}

export default ContextMenu;
