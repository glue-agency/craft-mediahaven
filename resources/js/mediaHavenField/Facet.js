import React from 'react';
import FacetCheckbox from './FacetCheckbox';
import FacetValue from './Filters/FacetValue';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      facet, onAddFacetValue, onRemoveFacetValue, filters
    } = this.props;
    const checkboxElements = facet.value.map((value, index) => {
      const checked = filters
        .filter(filter => filter instanceof FacetValue)
        .some(filter => filter.value.atom === value.atom);

      return (
        <FacetCheckbox
          key={index}
          value={value}
          onAddFacetValue={onAddFacetValue}
          onRemoveFacetValue={onRemoveFacetValue}
          checked={checked}
        />
      );
    });

    return (
      <div>
        <div className="heading"><span>{facet.title}</span></div>
        {checkboxElements}
      </div>
    );
  }
}

export default Facet;
