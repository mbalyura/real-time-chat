import React from 'react';
import { connect } from 'react-redux';
import { Spinner as BsSpinner } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const props = {
    isLoading: state.loadingInfo.isLoading,
  };
  return props;
};

const Spinner = (props) => {
  const { isLoading } = props;
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

export default connect(mapStateToProps, null)(Spinner);
