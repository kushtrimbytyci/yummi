import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest }) => {

  const { isAuthenticated } = user;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(PrivateRoute)
