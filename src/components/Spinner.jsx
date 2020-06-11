import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  const styles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: '100',
  };

  return (
    <BootstrapSpinner style={styles} animation="grow" variant="dark" />
  );
};

export default Spinner;
