import React from 'react';

function PendingProgressBar(props) {
  return (
    <div
      className="progressbar has-status pending"
      style={{ top: '50%' }}
    >
      <div className="progressbar-inner" style={{ width: '100%' }}></div>
    </div>
  );
}

export default PendingProgressBar;
