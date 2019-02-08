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
import SpinnerMore from './SpinnerMore';
import InfiniteScroll from 'react-infinite-scroller';
import PendingProgressBar from './PendingProgressBar';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.cancelTokens = {};
    this.scrollContainerRef = React.createRef();

    this.state = {
      files: [],
      loading: true,
      updating: false,
      updatingFacets: false,
      search: '',
      facets: [],
      filters: [
        new SearchFilter('search', null, () => {
          this.setState({ search: '' });
        }),
        new CollectionFilter('collection'),
      ],
      filesOffset: 0,
      totalNumberOfFiles: null,
      hasMoreFiles: false,
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
      this.setState({ updating: true, updatingFacets: true });
      this.fetchFiles();
      this.fetchFacets();
    }
  }

  fetchFiles(loadMore = false) {
    const { filters, filesOffset } = this.state;
    const queryString = buildQueryString(filters);
    const nrOfResults = 25;
    const startIndex = loadMore ? filesOffset + nrOfResults : 0;
    const pagination = `startIndex=${startIndex}&nrOfResults=${nrOfResults}`;
    const url = `/admin/mediahaven/api/resources/media?${pagination}&${queryString}`;

    if (!loadMore) {
      this.scrollToTop();
    }

    if (this.cancelTokens.files) {
      this.cancelTokens.files.cancel();
    }

    this.cancelTokens.files = axios.CancelToken.source();

    return axios.get(url, { cancelToken: this.cancelTokens.files.token })
      .then((response) => {
        this.setState((prevState) => {
          const newFiles = response.data.mediaDataList;
          const filesOffset = response.data.startIndex;
          const totalNumberOfFiles = response.data.totalNrOfResults;

          return {
            files: (loadMore ? [...prevState.files, ...newFiles] : newFiles),
            filesOffset,
            totalNumberOfFiles,
            hasMoreFiles: (filesOffset + nrOfResults) < totalNumberOfFiles,
            updating: false,
          };
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
          updatingFacets: false,
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

  loadMoreFiles = () => {
    this.fetchFiles(true);
  }

  scrollToTop() {
    const el = this.scrollContainerRef.current;

    if (el) {
      el.scrollTop = 0;
    }
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

  onSearchSubmit = () => {
    const { search } = this.state;

    this.updateFilter(
      this.getFilter('search').setValue(search)
    );
  }

  onSearchChange = (search) => {
    this.setState({ search });
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

  onRemoveActiveFilter = (filter) => {
    const clearedFilter = filter.clear();

    if (clearedFilter !== false) {
      return this.updateFilter(clearedFilter);
    }

    return this.removeFilter(filter);
  }

  progressBarTopPosition() {
    const scrollContainer = this.scrollContainerRef.current || null;
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

    return `calc(50% + ${scrollTop}px)`;
  }
  
  render() {
    const {
      files, loading, updating, updatingFacets, facets, filters, search, hasMoreFiles
    } = this.state;
    const { onSelectFile, selectedFile, onAddFile, isAddingFile } = this.props;
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
              <div className={updatingFacets ? 'disabled' : ''}>
                {facetElements}
              </div>
            </div>
            <div className="main" ref={this.scrollContainerRef}>
              <InfiniteScroll
                initialLoad={false}
                loader={<SpinnerMore key={0} />}
                loadMore={this.loadMoreFiles}
                hasMore={hasMoreFiles}
                useWindow={false}
              >
                <div className="toolbar">
                  <div className="flex">
                    <SearchField
                      onSubmit={this.onSearchSubmit}
                      onChange={this.onSearchChange}
                      search={search}
                    />
                    <Spinner isLoading={updating} />
                  </div>
                  <ActiveFilters filters={filters} onRemove={this.onRemoveActiveFilter} />
                </div>
                <FilesTable
                  files={files}
                  onSelectFile={onSelectFile}
                  selectedFile={selectedFile}
                  onAddFile={onAddFile}
                />
              </InfiniteScroll>
              {isAddingFile && (
                <PendingProgressBar top={this.progressBarTopPosition()} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default View;
