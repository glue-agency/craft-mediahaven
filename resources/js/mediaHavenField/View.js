import React from 'react';
import axios from 'axios';
import FilesTable from './FilesTable';
import SearchField from './SearchField';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios.get('/admin/mediahaven/api/resources/media')
      .then((response) => {
        this.setState({
          files: response.data.mediaDataList,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSearchUpdate = (search) => {
    console.log(search);
  }
  
  render() {
    const { files, loading } = this.state;
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
