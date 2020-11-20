import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import cart from '../images/cart.png'
import pizzaIcon from '../images/nav-icon.png'
import { connect } from 'react-redux'
import { logout } from '../actions/userAction'

const MainNav = ({ user, orders, logout }) => {
  const guestLink = (
    <>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink exact={true} activeClassName='active-nav' className="nav-link text-white" to='/'>Home <span className="sr-only">()</span></NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link to='/cart' className="btn btn-sm btn-primary">
            <img src={cart} alt="cart" width='18' />
            Cart <span className="badge badge-light">{orders.nrOfOrders}</span>
          </Link>
        </li>
        <li className="nav-item">
          <NavLink exact={true} activeClassName='active-nav' className="nav-link text-white" to='/login'>Login <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact={true} activeClassName='active-nav' className="nav-link text-white" to='/register'>Register <span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
    </>)


  const userLink = (
    <>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink exact={true} activeClassName='active-nav' className="nav-link text-white" to='/'>Home<span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to='/cart' className="btn btn-sm btn-primary">
            <img src={cart} alt="cart" width='18' />
            Cart <span className="badge badge-light">{orders.nrOfOrders}</span>
          </Link>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link text-white" to={`${user.user?.type === 'admin' ? '/admindashboard' : '/orders'}`}>{user.user?.type === 'admin' ? 'Admin' : 'Orders'}<span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link text-white" to='/' onClick={() => logout()}>Logout<span className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
    </>
  )

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <a className="navbar-brand text-white" href="/"><img src={pizzaIcon} alt="" />Yummi <span className='text-warning'>Pizza</span></a>
        <button className="navbar-toggler bg-transparent" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user.isAuthenticated === true ? userLink : guestLink}
        </div>
      </nav>
    </>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user
  }
}
export default connect(mapStateToProps, { logout })(MainNav)
