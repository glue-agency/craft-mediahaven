import React from 'react';
import axios from 'axios';
import FilesTable from './FilesTable';
import SearchField from './SearchField';
import Spinner from './Spinner';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loading: true,
      updating: false,
      search: '',
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;

    if (search !== prevState.search) {
      this.setState({ updating: true });
      this.fetchData();
    }
  }

  buildFetchUrl() {
    const { search } = this.state;
    let queryString = '';

    if (search) {
      queryString = `q=+(${search})`;
    }

    return `/admin/mediahaven/api/resources/media?${queryString}`;
  }

  fetchData() {
    const url = this.buildFetchUrl();

    axios.get(url)
      .then((response) => {
        this.setState({
          files: response.data.mediaDataList,
          loading: false,
          updating: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSearchUpdate = (search) => {
    this.setState({ search });
  }
  
  render() {
    const { files, loading, updating } = this.state;
    const { onSelectFile, selectedFile, onAddFile } = this.props;

    return (
      <div className="body">
        {loading ? (
          <div className="spinner big" />
        ) : (
          <div className="content">
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
