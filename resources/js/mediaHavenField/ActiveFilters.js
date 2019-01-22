import React from 'react';
import ActiveFilter from './ActiveFilter';

function ActiveFilters(props) {
  const { filters, onRemove } = props;
  const activeFilterElements = filters
    .filter(filter => (typeof filter.label === 'function'))
    .filter(filter => filter.isActive())
    .map(filter => (
      <ActiveFilter
        key={filter.name}
        filter={filter}
        onRemove={onRemove}
      />
    ));

  return (
    <div className="flex">
      {activeFilterElements}
    </div>
  );
}

export default ActiveFilters;
