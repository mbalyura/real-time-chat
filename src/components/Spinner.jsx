import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  const isLoadingMessages = useSelector(({ messagesInfo }) => messagesInfo.isLoading);
  const isLoadingChannels = useSelector(({ channelsInfo }) => channelsInfo.isLoading);

  if (!isLoadingMessages && !isLoadingChannels) return null;

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
