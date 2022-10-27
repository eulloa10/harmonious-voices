import { useDispatch } from "react-redux";

const ServerCard = ({server}) => {
    const dispatch = useDispatch();
    const initials = server.name.split(" ").map(word => word[0])

    return(
        <>
            <div>
                {server.server_img ? (
                    <img src={server.server_img} className="server-icon"></img>
                ): (
                    <p className="server-icon">{initials.join("")}</p>
                )}
            </div>
        </>
    )
}

export default ServerCard
