import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import validator from 'validator'
import Paper from '@material-ui/core/Paper'
import { Button, TextField } from '@material-ui/core'
import { startGetAllCust } from '../actions/customer-actions'
import { startGetAllProd } from '../actions/products-action'
import { toggleStatus, startLoginUser, startGetUser }  from '../actions/userAuth'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const attr= e.target.name 
         
        if(attr === 'email') {
            setEmail(e.target.value)
        } else if(attr === 'password') {
            setPassword(e.target.value)
        } 
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const runValidations = () => {
        
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
            email: email,
            password: password
        }


        const handleRedirect = () => {
            props.history.push('/dashboard')
            swal("Cool!", "You have logged in successfully!", "success")
            dispatch(toggleStatus())
            dispatch(startGetUser())
            dispatch(startGetAllCust())
            dispatch(startGetAllProd())
        }

        dispatch(startLoginUser(formData, handleRedirect))

        resetForm()

        } else {
            setFormErrors(errors)
        }
        
    }

    return (
        <div className='formDiv'><br /><br />
        <Paper elevation={3}>
            <h1>Login to your account</h1><br /><br />
            <form onSubmit={handleSubmit}>

                <TextField 
                        variant='outlined' 
                        label='Email' 
                        value={email} 
                        onChange={handleInputChange} 
                        name='email'
                        error={formErrors.email && <span>{formErrors.email}</span>}
                    /><br />
                {formErrors.email && <span style={{color:'red'}}> { formErrors.email } </span>}<br />

                <TextField 
                        variant='outlined' 
                        type='password'
                        label='Password' 
                        name='password'
                        value={password} 
                        onChange={handleInputChange} 
                        error={formErrors.password && <span>{formErrors.password}</span>}
                    /><br />
                {formErrors.password && <span style={{color:'red'}}> { formErrors.password } </span>}<br /><br />

                <Button variant="contained" color="primary" type='submit' style={{'marginRight' :'16px'}}>
                        Login
                </Button>

                 <Button variant="contained" color="secondary" onClick={() => {
                        resetForm()
                    }}>
                        Cancel
                </Button>
            </form>
        </Paper>
    </div>    
    )

}

export default Login
