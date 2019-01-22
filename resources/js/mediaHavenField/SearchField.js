import React from 'react';

class SearchField extends React.Component {
  onChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;

    onChange(value);
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;

    onSubmit();
    event.preventDefault();
  }

  render() {
    const { search } = this.props;

    return (
      <div className="flex-grow texticon search icon">
        <form onSubmit={this.onSubmit}>
          <input
            className="text fullwidth"
            type="text"
            autoComplete="off"
            placeholder="Search"
            onChange={this.onChange}
            value={search}
          />
        </form>
      </div>
    );
  }
}

export default SearchField;
