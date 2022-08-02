import {Button, Card, CardContent, CardHeader, Grid, Stack} from "@mui/material"
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import {Navigate} from "react-router";
import {useSelector} from "react-redux";
import {useState} from "react";
import {userSelector} from "../store/selectors";
import {isExpired} from "react-jwt";

const Auth = () => {

    const { token } = useSelector(userSelector)

    const { loading } = useSelector(userSelector)

    const [form, setForm] = useState("login")

    const avatar = form === "register" ? <HowToRegIcon color="primary"/> : <LoginIcon color="primary"/>
    const title = form === "register" ? "Register" : "Login"
    const buttonText = form === "login" ? "Register" : "Login"

    const handleRegisterClick = () => {
        setForm(prev => prev === "login" ? "register" : "login")
    }

    if (!isExpired(token)) {
        return <Navigate to="/"/>
    }

    return (
        <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
            height="100vh"
        >
            <Card
                sx={{ width: { xs: "100%", sm: 375 } }}
                elevation={10}
            >
                <CardHeader
                    avatar={avatar}
                    title={title}
                    titleTypographyProps={{ variant: "h6", color: "primary" }}
                />
                <CardContent>
                    {
                        form === "register"
                            ?
                            <RegisterForm/>
                            :
                            <LoginForm/>
                    }
                    <Stack direction="row" justifyContent="space-between" marginTop={2}>
                        <Button
                            size="small"
                            disabled={loading}
                            onClick={handleRegisterClick}
                        >
                            {buttonText}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Auth