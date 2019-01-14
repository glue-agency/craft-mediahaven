import React from 'react';

function DataField(props) {
  const { name, value } = props;

  return (
    <input
      type="hidden"
      name={name + (value ? '[]' : '')}
      value={value}
    />
  );
}

export default DataField;
