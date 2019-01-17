import React from 'react';
import FacetCheckbox from './FacetCheckbox';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { facet, onAddFacetValue, onRemoveFacetValue } = this.props;
    const checkboxElements = facet.value.map((value, index) => (
      <FacetCheckbox
        key={index}
        value={value}
        onAddFacetValue={onAddFacetValue}
        onRemoveFacetValue={onRemoveFacetValue}
      />
    ));

    return (
      <div>
        <div className="heading"><span>{facet.title}</span></div>
        {checkboxElements}
      </div>
    );
  }
}

export default Facet;
