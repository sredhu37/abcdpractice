import React from 'react';
import { useSelector } from 'react-redux';


const ErrorStrip = () => {
  const { showError, errMessage } = useSelector(state => state.Me);

  return showError ? (
    <div className='promptErrorMessage'>
      {errMessage}
    </div>
  )
  : null;
};

export default ErrorStrip;