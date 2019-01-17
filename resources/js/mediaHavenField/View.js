import React from 'react';
import axios from 'axios';
import FilesTable from './FilesTable';
import SearchField from './SearchField';
import Spinner from './Spinner';
import buildQueryString from './buildQueryString';
import Facet from './Facet';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loading: true,
      updating: false,
      search: '',
      facets: [],
    }
  }

  componentDidMount() {
    Promise.all([
      this.fetchFiles(),
      this.fetchFacets(),
    ]).then(() => {
      this.setState({ loading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;

    if (search !== prevState.search) {
      this.setState({ updating: true });
      this.fetchFiles();
      this.fetchFacets();
    }
  }

  fetchFiles() {
    const { search } = this.state;
    const queryString = buildQueryString(search);
    const url = `/admin/mediahaven/api/resources/media?${queryString}`;

    return axios.get(url)
      .then((response) => {
        this.setState({
          files: response.data.mediaDataList,
          updating: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchFacets() {
    const { search } = this.state;
    const queryString = buildQueryString(search);
    const url = `/admin/mediahaven/api/resources/facets?${queryString}`;

    return axios.get(url)
      .then((response) => {
        this.setState({
          facets: response.data.facet,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSearchUpdate = (search) => {
    this.setState({ search });
  }
  
  render() {
    const { files, loading, updating, facets } = this.state;
    const { onSelectFile, selectedFile, onAddFile } = this.props;
    const facetElements = facets.map(facet => (
      <Facet key={facet.name} facet={facet} />
    ));

    return (
      <div className="body has-sidebar">
        {loading ? (
          <div className="spinner big" />
        ) : (
          <div className="content has-sidebar">
            <div className="sidebar">
              {facetElements}
            </div>
            <div className="main">
              <div className="toolbar">
                <div className="flex">
                  <SearchField onUpdate={this.onSearchUpdate} />
                  <Spinner isLoading={updating} />
                </div>
              </div>
              <div className="elements">
                <div className="tableview">
                  <FilesTable
                    files={files}
                    onSelectFile={onSelectFile}
                    selectedFile={selectedFile}
                    onAddFile={onAddFile}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default View;
