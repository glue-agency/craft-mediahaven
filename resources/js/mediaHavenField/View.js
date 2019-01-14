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

    return (
      <div className="body">
        <div className="content">
          <div className="main">
            <div className="elements">
              <FilesTable files={files} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
