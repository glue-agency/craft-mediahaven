import React from 'react';
import axios from 'axios';
import FilesTable from './FilesTable';
import SearchField from './SearchField';
import Spinner from './Spinner';
import buildQueryString from './buildQueryString';
import Facet from './Facet';
import CollectionSelect from './CollectionSelect';
import SearchFilter from './Filters/Search';
import CollectionFilter from './Filters/Collection';
import FacetValueFilter from './Filters/FacetValue';
import signature from './Filters/signature';
import ActiveFilters from './ActiveFilters';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.cancelTokens = {};

    this.state = {
      files: [],
      loading: true,
      updating: false,
      facets: [],
      filters: [
        new SearchFilter('search'),
        new CollectionFilter('collection'),
      ],
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
    const { filters } = this.state;

    if (signature(filters) !== signature(prevState.filters)) {
      this.setState({ updating: true });
      this.fetchFiles();
      this.fetchFacets();
    }
  }

  fetchFiles() {
    const { filters } = this.state;
    const queryString = buildQueryString(filters);
    const url = `/admin/mediahaven/api/resources/media?${queryString}`;

    if (this.cancelTokens.files) {
      this.cancelTokens.files.cancel();
    }

    this.cancelTokens.files = axios.CancelToken.source();

    return axios.get(url, { cancelToken: this.cancelTokens.files.token })
      .then((response) => {
        this.setState({
          files: response.data.mediaDataList,
          updating: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      });
  }

  fetchFacets() {
    const { filters } = this.state;
    const queryString = buildQueryString(filters);
    const url = `/admin/mediahaven/api/resources/facets?${queryString}`;

    if (this.cancelTokens.facets) {
      this.cancelTokens.facets.cancel();
    }

    this.cancelTokens.facets = axios.CancelToken.source();

    return axios.get(url, { cancelToken: this.cancelTokens.facets.token })
      .then((response) => {
        this.setState({
          facets: response.data.facet,
        })
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      });
  }

  getFilter(name) {
    const { filters } = this.state;

    return filters.find(filter => filter.name === name);
  }

  updateFilter(selectedFilter, remove = false) {
    const { filters } = this.state;
    const filtersClone = [...filters].filter((filter) => {
      return filter.name !== selectedFilter.name;
    });

    if (!remove) {
      filtersClone.push(selectedFilter);
    }

    this.setState({ filters: filtersClone });
  }

  removeFilter(oldFilter) {
    this.updateFilter(oldFilter, true);
  }

  onSearchUpdate = (search) => {
    this.updateFilter(
      this.getFilter('search').setValue(search)
    );
  }

  onAddFacetValue = (value) => {
    this.updateFilter(new FacetValueFilter(value.atom, value));
  }

  onRemoveFacetValue = (value) => {
    this.removeFilter(new FacetValueFilter(value.atom, value));
  }

  onCollectionChange = (collection) => {
    this.updateFilter(
      this.getFilter('collection').setValue(collection)
    );
  }
  
  render() {
    const {
      files, loading, updating, facets, filters
    } = this.state;
    const { onSelectFile, selectedFile, onAddFile } = this.props;
    const facetElements = facets.map(facet => (
      <Facet
        key={facet.name}
        facet={facet}
        onAddFacetValue={this.onAddFacetValue}
        onRemoveFacetValue={this.onRemoveFacetValue}
        filters={filters}
      />
    ));

    return (
      <div className="body has-sidebar">
        {loading ? (
          <div className="spinner big" />
        ) : (
          <div className="content has-sidebar">
            <div className="sidebar">
              <CollectionSelect onChange={this.onCollectionChange} />
              {facetElements}
            </div>
            <div className="main">
              <div className="toolbar">
                <div className="flex">
                  <SearchField onUpdate={this.onSearchUpdate} />
                  <Spinner isLoading={updating} />
                </div>
                <ActiveFilters filters={filters} />
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
