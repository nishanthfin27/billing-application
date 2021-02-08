import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core'
import { startGetCust, startDeleteCust } from '../../actions/customer-actions'
import Modal from 'react-modal'
import CustomerForm from './CustomerForm'

const CustomerItem = (props) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const customers = useSelector(state => state.customers)
    const dispatch = useDispatch()

    const deleteCustomer = (_id) => {
        const confirmRemove = window.confirm('Are you sure ?')
        if(confirmRemove) {
            dispatch(startDeleteCust(_id))
    }
}
    const handleToggle = () => {
        setOpen(!open)
    }

    const handleEdit = (customer) => {
        handleToggle()
        setId(customer._id)
        setName(customer.name)
        setMobile(customer.mobile)
        setEmail(customer.email)
    }

    return (
            <>
            {customers.map((customer) => {
                return <TableRow  key={customer._id}>
                            <TableCell> {customer.name} </TableCell>
                            <TableCell> {customer.mobile} </TableCell>
                            <TableCell> {customer.email} </TableCell>
                            <TableCell><Link to={`/customers/${customer._id}`}><button  onClick={() => {
                                dispatch(startGetCust(customer._id))
                            }}><VisibilityOutlinedIcon /></button></Link></TableCell>
                            <TableCell><button onClick={() => {
                                handleEdit(customer)
                            }}><EditOutlinedIcon /></button></TableCell>
                            <TableCell><button onClick={() => {
                                deleteCustomer(customer._id)
                            }}><DeleteOutlineOutlinedIcon /></button></TableCell>
                        </TableRow>
            })}

            {open && (
                    <Modal isOpen={open}>
                    <CustomerForm
                        id={id}
                        name={name}
                        mobile={mobile}
                        email={email}
                        handleToggle={handleToggle}
                    />
                    <Button variant="contained" color="secondary"  onClick={() => {
                        handleToggle()
                    }}>close</Button>
                    </Modal>
                )}
        </>    
    )
}

export default CustomerItem
