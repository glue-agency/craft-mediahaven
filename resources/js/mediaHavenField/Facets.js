import React from 'react';
import Facet from './Facet';

function Facets(props) {
  const { facets } = props;
  const facetElements = facets.map(facet => (
    <Facet key={facet.name} facet={facet} />
  ));

  return (
    <div>
      {facetElements}
    </div>
  );
}

export default Facets;
