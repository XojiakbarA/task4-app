import {AppBar, Box, Button, IconButton, Stack, Toolbar, Tooltip} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useDispatch} from "react-redux";
import {deleteUsers, lockUsers, logout, unLockUsers} from "../store/actionCreators";

const Header = ({ userIDs, setSelectionModel }) => {

    const dispatch = useDispatch()

    const [params] = useSearchParams()

    const disabled = !userIDs.length

    const handleUnblockClick = () => {
        dispatch(unLockUsers({ userIDs, setSelectionModel }))
    }
    const handleBlockClick = () => {
        dispatch(lockUsers({ userIDs, setSelectionModel }))
    }
    const handleDeleteClick = () => {
        dispatch(deleteUsers({ userIDs, setSelectionModel, params }))
    }
    const handleLogoutClick = () => {
        dispatch(logout())
    }

    return (
        <AppBar color="transparent" sx={{ backdropFilter: 'blur(5px)' }}>
            <Toolbar>
                <Button
                    size="large"
                    component={Link}
                    to="/"
                >
                    Task 4
                </Button>
                <Box flexGrow={1}/>
                <Stack direction="row" spacing={4}>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Unlock">
                            <span>
                            <IconButton
                                color="success"
                                disabled={disabled}
                                onClick={handleUnblockClick}
                            >
                                <LockOpenIcon/>
                            </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Lock">
                            <span>
                            <IconButton
                                color="error"
                                disabled={disabled}
                                onClick={handleBlockClick}
                            >
                                <LockIcon/>
                            </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <span>
                            <IconButton
                                color="default"
                                disabled={disabled}
                                onClick={handleDeleteClick}
                            >
                                <DeleteIcon/>
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Stack>
                    <Tooltip title="Log out">
                        <IconButton
                            color="secondary"
                            onClick={handleLogoutClick}
                        >
                            <LogoutIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header