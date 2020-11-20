import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register, clearError } from '../actions/userAction'

const Register = ({ register, user, history, clearError }) => {

    const [registerInfo, setRegisterInfo] = useState({ username: '', password: '', name: '', address: '', zip: '', city: '' })
    const handleRegisterChange = e => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (registerInfo.username === '' || registerInfo.password === '' || registerInfo.name === '' || registerInfo.address === '' || registerInfo.zip === '' || registerInfo.city === '') {
            //don't handle the registration
        } else {
            register(registerInfo)
        }
    }
    useEffect(() => {
        if (user.isAuthenticated) {
            history.push('/')
        }
        clearError()
    }, [user.isAuthenticated])
    return (
        <>
            <div className="d-flex flex-column mb-5">
                <main className="m-auto">
                    <div className="container-fluid">
                        <div className="card login-card">
                            <div className="card-body">
                                <h2 className="login-card-title">Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="username" id="username" className="form-control" placeholder="Username" onChange={handleRegisterChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange={handleRegisterChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="name" id="firstName" className="form-control" placeholder="Name" onChange={handleRegisterChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="address" id="address" className="form-control" placeholder="Address" onChange={handleRegisterChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="zip" id="zip" className="form-control" placeholder="Zip/Postal Code" onChange={handleRegisterChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="city" id="zip" className="form-control" placeholder="City" onChange={handleRegisterChange} />
                                    </div>
                                    <div style={{ height: '25px' }}>
                                        <h6 className='text-danger text-lead text-center'>{user?.error}</h6>
                                    </div>

                                    <input name="login" id="login" className="btn btn-block login-btn" type="submit" value="Submit" />
                                </form>
                                <p className="login-card-footer-text">Already have an account? <Link to='/login' className="text-reset">Sign in here</Link></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { register, clearError })(Register)
