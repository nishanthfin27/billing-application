import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from '@uifabric/react-cards'
import { Text, } from 'office-ui-fabric-react/lib/Text'
import { Image } from 'office-ui-fabric-react/lib/Image'

import Paper from '@material-ui/core/Paper'
import { startGetAllCust } from '../actions/customer-actions'
import { startGetAllProd } from '../actions/products-action'
import { startGetBills } from '../actions/bills-action'

const UserDashboard = (props) => {
    const recentFiveCusts = []
    const recentFiveProds = []
    const recentFiveBills = []
    const customers = useSelector(state => state.customers)
    const products = useSelector(state => state.products)
    const bills = useSelector(state => state.bills)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllCust())
        dispatch(startGetAllProd())
        dispatch(startGetBills())
    },[])

    //Calculate Total Revenue
    const totalRevenue = () => {
        let count = 0
        for(const key of bills) {
            count += key.total
        }
        return count
    }

    //calculate recent five customers
        for(let i=0;i<4;i++){
            recentFiveCusts.push(customers[i])
        }
    
    //calculate recent five products
        for(let i=0;i<4;i++) {
            recentFiveProds.push(products[i])
        }

    //calculate recent five Transactions
        for(let i=0;i<4;i++) {
            recentFiveBills.push(bills[i])
        }
    
    //Display name of customer from id
    const displayCustomername =(id)=>{
        const arr = customers.filter((customer)=>{
            return customer._id === id
        })
        return arr[0]?.name
    }

     //Display name of product from id
     const displayname =(id)=>{
        const arr = products.filter((product)=>{
            return product._id === id
        })
        return arr[0]?.name;
    }

    return (
        <div>
            <div className='dashboardCard'>
                <Paper elevation={3}>
                    <h1>Total Customers</h1><br/>
                    <h2>{customers.length}</h2>
                </Paper> 
            </div>
            <div className='dashboardCard'>
                <Paper elevation={3}>
                    <h1>Total Products</h1><br/>
                    <h2>{products.length}</h2>
                </Paper> 
            </div>
            <div className='dashboardCard'>
                <Paper elevation={3}>
                    <h1>Total Sales</h1><br/>
                    <h2>{bills.length}</h2>
                </Paper> 
            </div>
            <div className='dashboardCard'>
                <Paper elevation={3}>
                    <h1>Total Revenue</h1><br/>
                    <h2>{ totalRevenue() }</h2>
                </Paper> 
            </div>

            <h1>Recent Five Customers</h1><br />
            <div className='horizontalAlign'>
                {recentFiveCusts.map((cust,i) => {
                if(cust) {
                    return (
                        <div key={i}>
                             <Card aria-label='Basic vertical card'>
                                <Card.Item>
                                    <Card.Item fill>
                                        <Image
                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0829LR23T2Q5DyQkyIds0eM4Vmlwe1acrJQ&usqp=CAU'
                                            alt='employee details'
                                        />
                                    </Card.Item>
                                    <div className='flex-container'>
                                        <div>
                                            <Text>Name : {cust.name}</Text>
                                        </div>
                                        <div>
                                            <Text>
                                                E-mail : {cust.email}
                                            </Text>
                                        </div>
                                        <div>
                                            <Text>
                                                Mobile : {cust.mobile}
                                            </Text>
                                        </div>
                                    </div>
                                </Card.Item>
                            </Card>
                        </div>
                    )
                }
            })}
            </div>


            <h1>Recent Five Products</h1><br />
            <div className='horizontalAlign'>
            {recentFiveProds.map((prod,i) => {
                if(prod) {
                    return (
                        <div key={i}>
                            <Card aria-label='Basic vertical card'>
                                <Card.Item>
                                    <Card.Item fill>
                                        <Image
                                            src='https://seeklogo.com/images/G/good-food-logo-36B7F2C85D-seeklogo.com.png'
                                            width='100%'
                                            alt='employee details'
                                        />
                                    </Card.Item>
                                    <div className='flex-container'>
                                        <div>
                                            <Text>Name : {prod.name}</Text>
                                        </div>
                                        <div>
                                            <Text>
                                                Price : {prod.price}
                                            </Text>
                                        </div>
                                    </div>
                                </Card.Item>
                            </Card>
                        </div>
                    )
                }
            })}
            </div>

            <h1>Recent Five Transactions</h1>
            <div className='horizontalAlign'>
            {recentFiveBills.map((bill,i) => {
                if(bill) {
                    return <div key={i}>
                        <Card aria-label='Basic vertical card'>
                        <Card.Item>
                            <Card.Item fill>
                                <Image
                                    src='https://image.shutterstock.com/image-vector/pos-terminal-payments-systems-financial-260nw-721536421.jpg'
                                    width='100%'
                                    alt='employee details'
                                />
                            </Card.Item>
                            <div className='flex-container'>
                                <div>
                                    <Text>Customer Name : {displayCustomername(bill.customer)}</Text>
                                </div>
                                <div>
                                    <Text>
                                        Date : {bill.date.slice(0,bill.date.indexOf('T')).split('-').join('/')}
                                    </Text>
                                </div>
                                <div>
                                <Text>Purchase details</Text>
                                    {
                                        bill.lineItems.map((item) => {
                                            return <li><Text>{displayname(item.product)} -{item.price}rs * {item.quantity} = {item.subTotal}</Text></li>
                                        })
                                    }
                                    <Text>Total Bill Amount - {bill.total}rs</Text>
                                </div>
                            </div>
                        </Card.Item>
                    </Card>
                    </div>
                }
            })}
            </div>
        </div>
    )
}

export default UserDashboard
