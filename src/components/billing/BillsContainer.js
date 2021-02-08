import React from 'react'
import AddBills from './AddBills'
import BillsDisplay from './BillsDisplay'
import LineItems from './LineItems'

const BillsContainer = (props) => {

    return (
        <div><br /><br /><br /><br /><br /><br />
            <div className='content'>
                <BillsDisplay />
                <LineItems />
                <AddBills />
            </div>
        </div>
    )
}

export default BillsContainer
