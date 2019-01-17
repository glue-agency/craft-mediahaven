import React from 'react';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { facet } = this.props;

    return (
      <div className="heading"><span>{facet.title}</span></div>
    );
  }
}

export default Facet;
