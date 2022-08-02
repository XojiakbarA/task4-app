import Header from "../components/Header";
import {Container, Grid, Paper, Stack, Toolbar, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../store/actionCreators";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useSearchParams} from "react-router-dom";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        sortable: false,
        filterable: false,
        flex: 1,
        minWidth: 60
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        sortable: false,
        filterable: false,
        flex: 2,
        minWidth: 150
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        sortable: false,
        filterable: false,
        flex: 2,
        minWidth: 150
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        filterable: false,
        flex: 2,
        minWidth: 150
    },
    {
        field: 'loggedInAt',
        headerName: 'Logged In At',
        sortable: false,
        filterable: false,
        flex: 2,
        minWidth: 150
    },
    {
        field: 'createdAt',
        headerName: 'Registration Date',
        sortable: false,
        filterable: false,
        flex: 2,
        minWidth: 150
    },
    {
        field: 'nonLocked',
        headerName: 'Status',
        sortable: false,
        filterable: false,
        flex: 1,
        minWidth: 120,
        renderCell: ({ row }) => (
            <Stack direction="row" spacing={1}>
                {
                    row.nonLocked
                    ?
                    <>
                    <LockOpenIcon color="success"/>
                    <Typography variant="body2">Active</Typography>
                    </>
                    :
                    <>
                    <LockIcon color="error"/>
                    <Typography variant="body2">Blocked</Typography>
                    </>
                }
            </Stack>
        )
    },
]

const Home = () => {

    const dispatch = useDispatch()

    const [params, setParams] = useSearchParams()

    const page = Number(params.get('page') || 0)
    const pageSize = Number(params.get('size')) || 10

    const { data, loading } = useSelector(state => state.users)

    const [selectionModel, setSelectionModel] = useState([])

    const handleSelectionModelChange = (model) => {
        setSelectionModel(model)
    }
    const handlePageChange = (page) => {
        const objParams = Object.fromEntries(params)
        setParams({ ...objParams, page })
    }
    const handlePageSizeChange = (size) => {
        setParams({ size })
    }

    useEffect(() => {
        dispatch(getUsers({ params }))
    }, [dispatch, params])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header userIDs={selectionModel} setSelectionModel={setSelectionModel}/>
                <Toolbar/>
            </Grid>
            <Grid item xs={12}>
                <Container maxWidth="xl">
                    <Paper sx={{ height: 600 }}>
                        <DataGrid
                            disableColumnMenu
                            loading={loading}
                            checkboxSelection
                            selectionModel={selectionModel}
                            onSelectionModelChange={handleSelectionModelChange}
                            paginationMode="server"
                            page={page}
                            pageSize={pageSize}
                            rowCount={data.totalElements || 1000}
                            rowsPerPageOptions={[10, 20, 30]}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                            columns={columns}
                            rows={data.content}
                        />
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Home