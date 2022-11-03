import { useDispatch } from "react-redux";
import './Servers.css'

const ServerBubble = ({server}) => {
    const dispatch = useDispatch();
    const initials = server.name.split(" ").map(word => word[0])

    return(
        <div>
            <div className={`server-icon-div ${server.id}`}>
                {server.server_img ? (
                    <img src={server.server_img} className={`server-icon ${server.id}`}></img>
                ): (
                    <p className={`server-icon ${server.id}`}>{initials.join("")}</p>
                )}
            </div>
        </div>
    )
}

export default ServerBubble
