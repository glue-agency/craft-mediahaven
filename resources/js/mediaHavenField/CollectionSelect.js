import React from 'react';
import axios from 'axios';

class CollectionSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: [],
      loading: true,
    }
  }

  componentDidMount() {
    const url = `/admin/mediahaven/api/resources/media/?q=+(type:collection)`;

    axios.get(url)
      .then((response) => {
        this.setState({
          collections: response.data.mediaDataList,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (event) => {
    const { onChange } = this.props;

    onChange(event.target.value || null);
  }

  render() {
    const { collections, loading } = this.state;
    const optionElements = collections.map(collection => (
      <option
        key={collection.mediaObjectId}
        value={collection.mediaObjectId}
      >
        {collection.title}
      </option>
    ));

    return (
      <div>
        <div className="heading"><span>Collection</span></div>
        <div className={"select fullwidth " + (loading ? 'disabled' : '')}>
          <select disabled={loading} onChange={this.onChange}>
            <option value="">All collections</option>
            {optionElements}
          </select>
        </div>
      </div>
    );
  }
}

export default CollectionSelect;
