import {Stack, TextField} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import PasswordInput from "./PasswordInput"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {registerValidationSchema} from "../utils/validate"
import {register} from "../store/actionCreators"
import {userSelector} from "../store/selectors"

const RegisterForm = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(userSelector)

    const { handleSubmit, getFieldProps, handleChange, handleBlur, errors, touched, values } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        enableReinitialize: true,
        validationSchema: registerValidationSchema,
        onSubmit: (data, { setErrors, resetForm }) => {
            dispatch(register({data, setErrors, resetForm}))
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    variant="filled"
                    label="First Name"
                    error={ touched.firstName && Boolean(errors.firstName) }
                    helperText={ touched.firstName && errors.firstName }
                    { ...getFieldProps('firstName') }

                />
                <TextField
                    variant="filled"
                    label="Last Name"
                    error={ touched.lastName && Boolean(errors.lastName) }
                    helperText={ touched.lastName && errors.lastName }
                    { ...getFieldProps('lastName') }
                />
                <TextField
                    variant="filled"
                    label="Email"
                    error={ touched.email && Boolean(errors.email) }
                    helperText={ touched.email && errors.email }
                    { ...getFieldProps('email') }
                />
                <PasswordInput
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={ touched.password && Boolean(errors.password) }
                    helperText={ touched.password && errors.password }
                />
                <PasswordInput
                    label="Confirm Password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={ touched.password_confirmation && Boolean(errors.password_confirmation) }
                    helperText={ touched.password_confirmation && errors.password_confirmation }
                />
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={loading}
                >
                    Register
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default RegisterForm