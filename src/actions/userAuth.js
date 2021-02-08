import axios from '../config/axios'

export const toggleStatus = () => {
    return {
        type: 'TOGGLE_STATE'
    }
}


const UserData = (user) => {
    return {
        type: 'GET_USER',
        payload: user
    }
}

export const startRegisterUser = (formData, handleRedirect) => {
    return (dispatch) => {
        axios.post('/users/register',formData)           
                .then((response) => {
                    const result = response.data 
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                       handleRedirect()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })

    }
}

export const startLoginUser = (formData, handleRedirect) => {
    return (dispatch) => {
        axios.post('/users/login',formData)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                localStorage.setItem('token', result.token)
                handleRedirect()
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const startGetUser = () => {
    return (dispatch) => {
        axios.get('/users/account',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    dispatch(UserData(result))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}