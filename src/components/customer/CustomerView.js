import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { startGetBills } from '../../actions/bills-action'
import { startGetAllCust } from '../../actions/customer-actions'
import EachCustomerBill from './EachCustomerBill'

const CustomerView = (props) => {
    const bills = useSelector(state => state.bills)
    const customers = useSelector(state => state.customers)
    let result = []
    let particularCustomerObj = {}

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllCust())
        dispatch(startGetBills())
    },[])

    if (bills.length > 0) {
        bills.forEach((bill) => {
          if (bill.customer === props.match.params.id) {
            result.push(bill)
          }
        })
        
      }

      if (customers.length > 0) {
        particularCustomerObj = customers.find((customer) => {
          if (customer._id === result[0]?.customer) {
            return customer
          } else if (result.length === 0) {
            return customer._id === props.match.params.id
          }
        })
      }

      console.log(result, 'result')

    return (
        <div>
            <div style={{ float: "right", paddingRight: "1rem" }}>
                    <Link to='/customers'>
                    <Button>back</Button>
                    </Link>
                </div>
                <h1>
                    Total {result.length} orders of {particularCustomerObj?.name}
                </h1>
                <div>
                    {result?.map((customer) => {
                        return (
                            <div key={customer._id}>
                                    <EachCustomerBill 
                                        customer={customer} 
                                />
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default CustomerView
