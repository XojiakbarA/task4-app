import {useSelector} from "react-redux";
import {userSelector} from "../store/selectors";
import {isExpired} from "react-jwt";
import {Navigate, Outlet} from "react-router";

const Protected = () => {

    const { token } = useSelector(userSelector)

    if (isExpired(token)) {
        return <Navigate to="/auth"/>
    }

    return <Outlet/>
}

export default Protected