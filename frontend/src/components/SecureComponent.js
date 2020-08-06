import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecureComponent = (props) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (isLoggedIn) ? props.component : <Redirect to='/' />;
}

export default SecureComponent;
