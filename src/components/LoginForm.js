import {Stack, TextField} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import PasswordInput from "./PasswordInput"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {loginValidationSchema} from "../utils/validate"
import {login} from "../store/actionCreators"
import {userSelector} from "../store/selectors"

const LoginForm = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(userSelector)

    const { handleSubmit, getFieldProps, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: loginValidationSchema,
        onSubmit: (data) => {
            dispatch(login({ data }))
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    variant="filled"
                    label="Email"
                    error={ touched.email && Boolean(errors.email) }
                    helperText={ touched.email && errors.email }
                    { ...getFieldProps('email') }
                />
                <PasswordInput
                    label="Password"
                    error={ touched.password && Boolean(errors.password) }
                    helperText={ touched.password && errors.password }
                    { ...getFieldProps('password') }
                />
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loading}
                >
                    Login
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default LoginForm