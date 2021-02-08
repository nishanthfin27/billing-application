import React from 'react'
import CustomerForm from './CustomerForm'
import CustomersList from './CustomersList'

const CustomerContainer = (props) => {

    return (
        <div><br /><br /><br /><br /><br /><br />
            <div className='content'>     
                <CustomersList/>
                <CustomerForm />
            </div>
        </div>
    )
}

export default CustomerContainer
