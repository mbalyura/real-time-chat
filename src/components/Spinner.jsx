import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner as BsSpinner } from 'react-bootstrap';

const Spinner = () => {
  const isLoading = useSelector(({ loadingInfo }) => loadingInfo.isLoading);

  if (!isLoading) return null;

  const styles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: '100',
  };

  return (
    <BsSpinner style={styles} animation="grow" variant="dark" />
  );
};

export default Spinner;
