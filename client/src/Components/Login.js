import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login, clearError } from '../actions/userAction'
import { connect } from 'react-redux'

const Login = ({ history, user, login, clearError }) => {
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })

    const handleLoginChange = e => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(loginInfo)
    }

    useEffect(() => {
        if (user.isAuthenticated) {
            history.push('/')
        }
        clearError()

    }, [user.isAuthenticated])
    return (
        <>
            <div className="d-flex flex-column">
                <main className="m-auto">
                    <div className="container-fluid">
                        <div className="card login-card">
                            <div className="card-body">
                                <h2 className="login-card-title">Logo</h2>
                                <p className="login-card-description">Sign into your account</p>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="form-group">
                                        <label htmlFor="username" className="sr-only">username</label>
                                        <input value={loginInfo.username} onChange={handleLoginChange} type="text" name="username" id="username" className="form-control" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input value={loginInfo.password} onChange={handleLoginChange} type="password" name="password" id="password" className="form-control" placeholder="Password" />
                                        <div style={{ height: '10px' }}>
                                            <h6 className='text-danger text-lead text-center'>{user?.error}</h6>
                                        </div>
                                    </div>
                                    <input name="login" id="login" className="btn btn-block login-btn" type="submit" value="Login" />
                                </form>
                                <p className="login-card-footer-text">Don't have an account? <Link to='/register' className="text-reset">Register here</Link></p>
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

export default connect(mapStateToProps, { login, clearError })(Login)
