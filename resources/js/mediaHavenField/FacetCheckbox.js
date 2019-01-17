import React from 'react';

class FacetCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        <label>
          <input type="checkbox" /> {value.label} ({value.count})
        </label>
      </div>
    );
  }
}

export default FacetCheckbox;
