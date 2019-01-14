import React from 'react';
import axios from 'axios';
import FilesTable from './FilesTable';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    }
  }

  componentDidMount() {
    axios.get('/admin/mediahaven/api/resources/media')
      .then((response) => {
        this.setState({
          files: response.data.mediaDataList,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  render() {
    const { files } = this.state;
    const { onSelectFile, selectedFile } = this.props;

    return (
      <div className="body">
        <div className="content">
          <div className="main">
            <div className="elements">
              <div className="tableview">
                <FilesTable
                  files={files}
                  onSelectFile={onSelectFile}
                  selectedFile={selectedFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
