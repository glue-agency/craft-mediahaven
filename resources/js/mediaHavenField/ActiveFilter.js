import React from 'react';

function ActiveFilter(props) {
  const { filter } = props;

  return (
    <div className="element small removable">
      <div className="label">
        <span className="title">
          <a className="delete icon" title="Remove"></a>
          {filter.label()}
        </span>
      </div>
    </div>
  );
}

export default ActiveFilter;
