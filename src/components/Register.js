import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import validator from 'validator'
import Paper from '@material-ui/core/Paper'
import { Button, TextField } from '@material-ui/core'
import { startRegisterUser } from '../actions/userAuth'

const Register = (props) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const attr= e.target.name 
         
        if(attr === 'userName') {
            setUserName(e.target.value)
        } else if(attr === 'email') {
            setEmail(e.target.value)
        } else if(attr === 'password') {
            setPassword(e.target.value)
        } else if(attr === 'businessName') {
            setBusinessName(e.target.value)
        } else if(attr === 'address') {
            setAddress(e.target.value)
        }
    }

    const resetForm = () => {
        setUserName('')
        setEmail('')
        setPassword('')
        setBusinessName('')
        setAddress('')
    }

    const runValidations = () => {
        //name
        if(userName.trim().length === 0) {
            errors.userName = 'name cannot be blank'
        } else if(userName.trim().length < 5) {
            errors.userName = 'name should have more than 5 characters'
        }

        //email
        if(email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }

        //password
        if(!(password.length > 8 && password.length < 128)) {
            errors.password = 'password should be between 8 and 128 characters'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})

            
        const formData = {
            username: userName,
            email: email,
            password: password,
            businessName: businessName,
            address: address
        }


        const handleRedirect = () => {
            props.history.push('/login')
            swal("cool", "You have registered successfully!", "success")
        }

        dispatch(startRegisterUser(formData, handleRedirect))

        resetForm()

        } else {
            console.log('form errors', errors)
            setFormErrors(errors)
        }
        
    }

    return (
        <div className='formDiv'><br /><br />
        <Paper elevation={3}>
            <h1>Register With Us</h1>
            <form onSubmit={handleSubmit}>

                    <TextField 
                        variant='outlined' 
                        label='Username*' 
                        value={userName} 
                        onChange={handleInputChange} 
                        name='userName'
                        error={formErrors.userName && <span>{formErrors.userName}</span>}
                    /><br />
                    {formErrors.userName && <span style={{color:'red'}}> { formErrors.userName } </span>}<br />

                    <TextField 
                        variant='outlined' 
                        label='Email*' 
                        value={email} 
                        onChange={handleInputChange} 
                        name='email'
                        error={formErrors.email && <span>{formErrors.email}</span>}
                    /><br />
                    {formErrors.email && <span style={{color:'red'}}> { formErrors.email } </span>}<br />

                    <TextField 
                        variant='outlined' 
                        type='password'
                        label='password*'
                        name='password' 
                        value={password} 
                        onChange={handleInputChange} 
                        error={formErrors.password && <span>{formErrors.password}</span>}
                    /><br />
                    {formErrors.password && <span style={{color:'red'}}> { formErrors.password } </span>}<br />

                    <TextField 
                        variant='outlined'
                        label='business name'
                        name='businessName'
                        value={businessName}
                        onChange={handleInputChange}
                    /><br /><br />

                    <TextField 
                        variant='outlined'
                        label='address'
                        name='address'
                        value={address}
                        onChange={handleInputChange}
                    /><br /><br />


                    <Button variant="contained" color="primary" type='submit' style={{'marginRight' :'16px'}}>
                        Register
                    </Button>

                    <Button variant="contained" color="secondary" onClick={() => {
                        resetForm()
                    }}>
                        Cancel
                    </Button>

                </form>
            </Paper>
    </div>    )
}

export default Register
