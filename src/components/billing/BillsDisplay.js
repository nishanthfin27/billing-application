import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { startDeleteBill, startGetBill } from '../../actions/bills-action'

const BillsDisplay = (props) => {
    
    const bills = useSelector(state => state.bills)
    const dispatch = useDispatch()

    const handleDelete = (_id) => {
        const confirmRemove = window.confirm('Are you sure ?')
        if(confirmRemove) {
            dispatch(startDeleteBill(_id))
        }
    }

    return (
        <div>
            <h1>Total Bills - { bills.length }</h1><br />
            <Paper elevation={3}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Bill Date</b></TableCell>
                                    <TableCell><b>View</b></TableCell>
                                    <TableCell><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {bills.length > 0 && bills.map((bill) => {
                                return <TableRow key={bill._id}>
                                    <TableCell> {bill.date?.slice(0,10)} </TableCell>
                                    <TableCell><button onClick={() => {
                                        dispatch(startGetBill(bill._id))
                                    }}><VisibilityOutlinedIcon /></button></TableCell>
                                    <TableCell><button onClick={() => {
                                        handleDelete(bill._id)
                                    }}><DeleteOutlineOutlinedIcon /></button></TableCell>
                                </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Paper>
        </div>
    )
}

export default BillsDisplay
