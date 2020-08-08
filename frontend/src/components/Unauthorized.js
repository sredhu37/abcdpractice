import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return(
    <div>
      <Alert variant="danger">
        You are not authorized to do this.
        Please contact Administrator if you need help.
        <br/>
        <Alert.Link as={Link} to='/profile'> Click here to go back to PROFILE </Alert.Link>
      </Alert>
    </div>
  );
};

export default Unauthorized;