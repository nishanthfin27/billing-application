import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core'
import { startEditCust, startPostCust } from '../../actions/customer-actions'

const CustomerForm = (props) => {
    const { handleToggle, id, name, mobile: phone, email: eMail  } = props 
    
    const dispatch = useDispatch()

    const [userName, setUserName] = useState(name ? name : '')
    const [mobile, setMobile] = useState(phone ? phone : '')
    const [email, setEmail] = useState(eMail ? eMail : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleInputChange = (e) => {
        const attr = e.target.name

        if(attr === 'userName') {
            setUserName(e.target.value)
        } else if(attr === 'mobile') {
            setMobile(e.target.value)
        } else if(attr === 'email') {
            setEmail(e.target.value)
        }
    }

    const runValidations = () => {
        //name
        if(userName.trim().length === 0) {
            errors.userName = 'name cannot be blank'
        } else if(userName.trim().length < 5) {
            errors.userName = 'name should have more than 5 characters'
        }

        
        //mobile
        if(mobile.trim().length === 0) {
            errors.mobile = 'mobile cannot be blank'
        } else if(mobile.length !== 10) {
            errors.mobile = 'mobile should be 10 digits'
        }

        //email
        if(email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }

    }

    const resetForm = () => {
        setUserName('')
        setMobile('')
        setEmail('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            const formData = {
                name: userName,
                mobile: mobile,
                email: email
            }
            
            if(!(id)) {
                dispatch(startPostCust(formData))
                resetForm()
            } else {
                dispatch(startEditCust(id,formData))
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
                <h1 className='textAlign'>Add Customer</h1>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        variant='outlined' 
                        type='text'
                        name='userName'
                        label='UserName'
                        value={userName}
                        onChange={handleInputChange}
                        placeholder='enter name*'
                    /><br />
                    {formErrors.userName && <span style={{color:'red'}}> { formErrors.userName } </span>}<br />

                    <TextField 
                        variant='outlined'
                        type='text'
                        name='mobile'
                        label='Mobile'
                        value={mobile}
                        onChange={handleInputChange}
                        placeholder='enter mobile*'
                    /><br />
                    {formErrors.mobile && <span style={{color:'red'}}> { formErrors.mobile } </span>}<br />

                    <TextField 
                        variant='outlined'
                        type='email'
                        name='email'
                        label='Email'
                        value={email}
                        onChange={handleInputChange}
                        placeholder='enter email'
                    /><br />
                    {formErrors.email && <span style={{color:'red'}}> { formErrors.email } </span>}<br />
                    
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

export default CustomerForm
