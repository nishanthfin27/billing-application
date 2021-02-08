import React from 'react'
import { Link, Route, withRouter ,Redirect} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import { toggleStatus } from '../actions/userAuth'
import CustomerContainer from './customer/CustomerContainer'
import UserDashboard from './UserDashboard'
import ProductsContainer from './products/ProductsContainer'
import BillsContainer from './billing/BillsContainer'
import CustomerView from './customer/CustomerView'

const NavbarLink = styled.div`
  width: 100 px;
  height: 5rem;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavBar = (props) => {
    
    const userLoggedIn = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div>
            <Paper elevation={3}>
            <NavbarLink>
                <Link className="link" to='/'>Home</Link>
                {userLoggedIn ? (
                    <div>
                        <Link className="link" to='/dashboard'>Dashboard</Link>
                        <Link className="link" to='/account'>Account</Link>
                        <Link className="link" to='/customers'>Customers</Link>
                        <Link className="link" to='/products'>Products</Link>
                        <Link className="link" to='/billing'>Billing</Link>
                        <Link className="link" to='/' onClick={() => {
                                localStorage.removeItem('token')
                                dispatch(toggleStatus())
                                props.history.push('/')
                                swal("Cool!", "You have logged out successfully!", "success")
                        }}>logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link className="link" to='/register'>Register</Link>
                        <Link className="link" to='/login'>Login</Link>
                    </div>
                )}
            </NavbarLink>
            </Paper>
            

            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {userLoggedIn? (
                <div>
                    <Route exact path='/account' component={Account} />
                    <Route exact path='/dashboard' component={UserDashboard} />
                    <Route exact path='/customers' component={CustomerContainer} />
                    <Route exact path='/products' component={ProductsContainer} />
                    <Route exact path='/billing' component={BillsContainer} />
                    <Route exact path='/customers/:id' component={CustomerView} />
                </div>
            ) : (
                <div>
                    <Redirect to='/'/>
                </div>
            )}

        </div>
    )
}


export default withRouter(NavBar)
