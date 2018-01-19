import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route {...rest} render={ (props) => {
      return ( rest.token !== undefined
        ? (
          <Component {...rest} />
        )
        : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
        )
      );
    }} />
  );
}

export default PrivateRoute;
