import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Modal from 'react-modal'
import { startPostBill } from '../../actions/bills-action'
import { addLineItem, startResetLineItem } from '../../actions/lineItem-action'
import Invoice from './Invoice'

const AddBills = (props) => {
    
    const [date, setDate] = useState('')
    const [toggle, setToggle] = useState(false)
    const [custDropDown, setCustDropDown] = useState('')
    const [prodDropDown, setProdDropDown] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}


    const customers = useSelector(state => state.customers)
    const lineItem = useSelector(state => state.lineItem)   
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()


    const handleInputChange = (e) => {
        const attr = e.target.name

        if(attr === 'date') {
            setDate(e.target.value)
        }else if(attr === 'custDropDown') {
            setCustDropDown(e.target.value)
        }else if(attr === 'prodDropDown') {
            setProdDropDown(e.target.value)
        }else if(attr === 'quantity') {
            setQuantity(e.target.value)
        }
    }

    const runValidations = () => {
        //date
        if(date.trim().length === 0) {
            errors.date = 'select a date'
        } 

        //customer 
        if(custDropDown.trim().length === 0) {
            errors.customer = 'select a customer'
        } 

        //product
        if(prodDropDown.trim().length === 0) {
            errors.product = 'select a product'
        } 

    }

    const handleLineItem = () => {
        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const lineItemData = {
                product: prodDropDown, 
                quantity: quantity 
            }
    
            dispatch(addLineItem(lineItemData))
    
            // setProdDropDown('')
            setQuantity(1)
        } else {
            setFormErrors(errors)
        }
    
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                date : date,
                customer: custDropDown,
                lineItems:lineItem
            }
    
            dispatch(startPostBill(formData))
            handleToggle()
    
            setDate('')
            setCustDropDown('')
            setProdDropDown('')
            setQuantity('')
            dispatch(startResetLineItem())

        }else{
            setFormErrors(errors)
        }
    
    }

    return (
        <div>
            <Paper elevation={3}>
            <h1 className='content'>Billing Form</h1>
            <form onSubmit={handleSubmit}>
               <div className='leftAlignForm'>
               <input 
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleInputChange}
                /><br />
                {formErrors.date && <span style={{color:'red'}}> { formErrors.date } </span>}<br />
         
                <select name='custDropDown' value={custDropDown} onChange={handleInputChange}>
                            <option> Select customer </option>
                            {
                                customers.map((customer) => {
                                    return <option key={customer._id} value={customer._id}> { customer.name } </option>
                                })
                            }
                </select><br />
                {formErrors.customer && <span style={{color:'red'}}> { formErrors.customer } </span>}<br />

                <select name='prodDropDown' value={prodDropDown} onChange={handleInputChange}>
                            <option> Select product </option>
                            {
                                products.map((product) => {
                                    return <option key={product._id} value={product._id}> 
                                    { product.name } </option>
                                })
                            }
                </select><br />
                {formErrors.product && <span style={{color:'red'}}> { formErrors.product } </span>}<br />
                
                <input 
                    type='number'
                    name='quantity'
                    value={quantity}
                    onChange={handleInputChange}
                    placeholder='enter quantity'
                /><br /><br />

               </div>
                 <Button variant="contained" color="primary" style={{'marginRight' :'16px'}} 
                    onClick={() => {
                        handleLineItem()
                    }}>
                        Add
                </Button>

                <Button variant="contained" color="secondary" type="submit">
                    Generate Bill
                </Button>
            </form>
            </Paper>

            {toggle && (
                    <Modal isOpen={toggle}>
                    <Invoice
                        handleToggle={handleToggle}
                    />
                    <div className='alignButton'>
                        <Button variant="contained" color="secondary"  onClick={() => {
                            handleToggle()
                        }}>close</Button>
                    </div>
                    </Modal>
                )}

        </div>
    )
}



export default AddBills
