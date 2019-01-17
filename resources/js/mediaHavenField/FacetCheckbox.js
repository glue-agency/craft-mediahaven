import React from 'react';

class FacetCheckbox extends React.Component {
  onChange = (event) => {
    const { target } = event;
    const { onAddFacetValue, onRemoveFacetValue, value } = this.props;

    if (target.checked) {
      onAddFacetValue(value);
    } else {
      onRemoveFacetValue(value);
    }
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            onChange={this.onChange}
          /> {value.label} ({value.count})
        </label>
      </div>
    );
  }
}

export default FacetCheckbox;
