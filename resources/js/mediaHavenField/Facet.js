import React from 'react';
import FacetCheckbox from './FacetCheckbox';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { facet } = this.props;
    const checkboxElements = facet.value.map(value => (
      <FacetCheckbox value={value} />
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
