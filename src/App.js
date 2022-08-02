import {Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import CustomSnackbar from "./components/CustomSnackbar";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "./store/actionCreators";
import Protected from "./components/Protected";

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <>
        <Routes>
            <Route element={<Protected/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
        </Routes>
        <CustomSnackbar/>
        </>
    )
}

export default App