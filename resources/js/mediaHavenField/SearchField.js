import React from 'react';

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    }
  }

  onChange = (event) => {
    const { value } = event.target;

    this.setState({
      search: value,
    });
  }

  onSubmit = (event) => {
    const { onUpdate } = this.props;
    const { search } = this.state;

    onUpdate(search);
    event.preventDefault();
  }

  render() {
    return (
      <div className="flex-grow texticon search icon">
        <form onSubmit={this.onSubmit}>
          <input
            className="text fullwidth"
            type="text"
            autoComplete="off"
            placeholder="Search"
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

export default SearchField;
