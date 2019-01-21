import React from 'react';
import ActiveFilter from './ActiveFilter';

function ActiveFilters(props) {
  const { filters } = props;
  const activeFilterElements = filters
    .filter(filter => (typeof filter.label === 'function'))
    .map(filter => (
      <ActiveFilter key={filter.name} filter={filter} />
    ));

  return (
    <div className="flex">
      {activeFilterElements}
    </div>
  );
}

export default ActiveFilters;
