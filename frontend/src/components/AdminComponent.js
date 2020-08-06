import React from 'react';
import Unauthorized from './Unauthorized';
import { useSelector } from 'react-redux';

const AdminComponent = (props) => {
  const myUser = useSelector(state => state.user.myUser);
  return (myUser.role === 'ADMIN') ? props.component : <Unauthorized />;
}

export default AdminComponent;
