import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSever } from "../../store/servers";
import './Servers.css'


const CreateSeverForm = ( {hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserId = useSelector(state => state.session.user.id);
    const username = useSelector(state => state.session.user.username);

    const [name, setName] = useState('');
    const [serverImg, setServerImg] = useState('');


    const updateName = (e) => setName(e.target.value);
    const updateServerImg = (e) => setServerImg(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            server_img: serverImg,
        };

        let createdServer = await dispatch(addSever(payload))
        .catch(async (res) => {
            const data = await res.json();
            console.log(data);
            // if(data && data.errors) setErrors(data.errors)
        });
        if(createdServer){
            history.push(`/servers/${createdServer.id}`);
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };

    // const errorsArr = Object.values(errors);
      return (
            <section className="new-form-holder centered middled">
                <form className="create-server-form" onSubmit={handleSubmit}>
                    {/* <ul>
                         {errorsArr.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={updateName} />
                    <input
                        type="text"
                        placeholder="Server Image"
                        value={serverImg}
                        onChange={updateServerImg} />
                    <button className='form-button' type="submit">Create New Server</button>
                    <button className='form-button' type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </section>
        )
}

export default CreateSeverForm;
