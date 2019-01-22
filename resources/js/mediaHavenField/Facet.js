import React from 'react';
import FacetCheckbox from './FacetCheckbox';
import FacetValueFilter from './Filters/FacetValue';

function Facet(props) {
  const {
    facet, onAddFacetValue, onRemoveFacetValue, filters
  } = props;

  const checkboxElements = facet.value
    .map((value, index) => {
      const checked = filters
        .filter(filter => filter instanceof FacetValueFilter)
        .some(filter => filter.value.atom === value.atom);

      return checked ? null : (
        <FacetCheckbox
          key={index}
          value={value}
          onAddFacetValue={onAddFacetValue}
          onRemoveFacetValue={onRemoveFacetValue}
          checked={checked}
        />
      );
    })
    .filter(element => element);

  if (!checkboxElements.length) {
    return null;
  }

  return (
    <div>
      <div className="heading"><span>{facet.title}</span></div>
      {checkboxElements}
    </div>
  );
}

export default Facet;
