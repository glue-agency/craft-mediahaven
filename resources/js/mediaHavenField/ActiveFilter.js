import React from 'react';

function ActiveFilter(props) {
  const { filter, onRemove } = props;

  function onClick() {
    onRemove(filter);
  }

  return (
    <div className="element small removable">
      <div className="label">
        <span className="title">
          <a
            className="delete icon"
            title="Remove"
            onClick={onClick}
          ></a>
          {filter.label()}
        </span>
      </div>
    </div>
  );
}

export default ActiveFilter;
