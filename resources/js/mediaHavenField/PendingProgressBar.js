import React from 'react';

function PendingProgressBar(props) {
  const { top } = props;

  return (
    <div
      className="progressbar has-status pending"
      style={{ top }}
    >
      <div className="progressbar-inner"></div>
    </div>
  );
}

export default PendingProgressBar;
