import React, { useLayoutEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './Components/App'
import Login from './Components/Login'
import Register from './Components/Register'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Orders from './Components/Orders'
import Admindashboard from './Components/Admindashboard'
import { connect } from 'react-redux'
import { loadUser } from './actions/userAction'
import PrivRoute from './Components/PrivRoute'
import MainNav from './Components/MainNav'
import Footer from './Components/Footer'


const Router = ({ loadUser }) => {
    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            loadUser(localStorage.getItem('token'))
        }
    }, [])
    return (<>
        <div className="main-app">
            <MainNav />
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/checkout' component={Checkout} />
                <PrivRoute exact path='/admindashboard' component={Admindashboard} />
                <PrivRoute exact path='/orders' component={Orders} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route component={() => <h1 className="text-white text-center mt-5">Error 404 / Site not found</h1> } />
            </Switch>
        </div>
        <Footer />
    </>
    )
}

export default connect(null, { loadUser })(Router)
