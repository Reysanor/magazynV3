import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//pass parametrs - check token and then redirect to selected Cpomponent or login page       
//something like Override default Route 
const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
  //take otherProps, render props (...otherProps) and redirect to component (path) only if valid
  {...otherProps}
  render={props =>
    security.validToken === true ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  }
/>
);

SecuredRoute.propTypes = {
security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
security: state.security
});

export default connect(mapStateToProps)(SecuredRoute);