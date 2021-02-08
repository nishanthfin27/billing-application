import React from 'react'
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomerItem from './CustomerItem'

const CustomersList = (props) => {
    const customers = useSelector(state => state.customers)

    return (
        <div>
            {customers.length === 0 ? (
                <p>No customers found</p>
            ) : (
                <div>
                    <h2>No of Customers - { customers.length } </h2><br />
                    <Paper elevation={3}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Customer Name</b></TableCell>
                                    <TableCell><b>Mobile</b></TableCell>
                                    <TableCell><b>E-mail</b></TableCell>
                                    <TableCell><b>View</b></TableCell>
                                    <TableCell><b>Edit</b></TableCell>
                                    <TableCell><b>Delete</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CustomerItem />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                </div>
            )}
        </div>
    )
}

export default CustomersList
