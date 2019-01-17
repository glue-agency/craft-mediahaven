import React from 'react';

function Spinner(props) {
  const { isLoading } = props;

  return (
    <div className={"spinner " + (!isLoading ? 'invisible' : '')} />
  );
}

export default Spinner;
