import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core'
import { startEditProd, startPostProd } from '../../actions/products-action'

const ProductForm = (props) => {
    const { id, name: prodName , price: prodPrice, handleToggle } = props 
    const dispatch = useDispatch()

    const [name, setName] = useState(prodName ? prodName : '')
    const [price, setPrice] = useState(prodPrice ? prodPrice : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleInputChange = (e) => {
        const attr = e.target.name

        if(attr === 'name') {
            setName(e.target.value)
        } else if(attr === 'price') {
            setPrice(e.target.value)
        } 
    }

    const runValidations = () => {
        //name
        if(name.trim().length === 0) {
            errors.name = 'product name cannot be blank'
        }

        if(price.length === 0) {
            errors.price = 'price cannot be blank'
        }

    }

    const resetForm = () => {
        setName('')
        setPrice('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                name: name,
                price: price
            }
    
            if( !(id)) {
                dispatch(startPostProd(formData))
                resetForm()
            } else {
                dispatch(startEditProd(id,formData))
                handleToggle()
            }


        } else {
            console.log('form errors', errors)
            setFormErrors(errors)
        }

    }

    return (
        <div>
            <Paper elevation={3}>
                <h1 className='textAlign'>Add Product</h1>
                <form onSubmit={handleSubmit}>

                    <TextField 
                        variant='outlined'
                        type='text'
                        name='name'
                        label='Name'
                        value={name}
                        onChange={handleInputChange}
                    /><br />
                    {formErrors.name && <span style={{color:'red'}}> { formErrors.name } </span>}<br />

                    <TextField 
                        variant='outlined'
                        type='text'
                        name='price'
                        label='Price'
                        value={price}
                        onChange={handleInputChange}
                        placeholder='enter price*'
                    /><br />
                    {formErrors.price && <span style={{color:'red'}}> { formErrors.price } </span>}<br />
                    
                    <div className='alignButton'>
                        <Button variant="contained" color="primary" type='submit'>
                            {id ? 'Save' : 'Add'}
                        </Button>

                        <Button variant="contained" color="secondary" onClick={() => {
                            resetForm()
                        }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default ProductForm
