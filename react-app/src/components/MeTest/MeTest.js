import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

const MeTest = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  const handleLogOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return <button onClick={handleLogOut}>Logout</button>;
};

export default MeTest;
