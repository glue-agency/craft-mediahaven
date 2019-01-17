import React from 'react';
import axios from 'axios';
import buildQueryString from './buildQueryString';
import Facet from './Facet';

class Facets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facets: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { search } = this.props;
    const queryString = buildQueryString(search);
    const url = `/admin/mediahaven/api/resources/facets?${queryString}`;

    axios.get(url)
      .then((response) => {
        this.setState({
          facets: response.data.facet,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { facets } = this.state;
    const facetElements = facets.map(facet => (
      <Facet key={facet.name} facet={facet} />
    ));

    return (
      <div>
        {facetElements}
      </div>
    );
  }
}

export default Facets;
