import React from 'react';
import Modal from './Modal';
import View from './View';
import AddedFiles from './AddedFiles';

class MediaHavenField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewIsAlreadyRendered: false,
      selectedFile: null,
      files: [],
    }
  }

  openModal = () => {
    this.setState({
      isModalVisible: true,
      viewIsAlreadyRendered: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  }

  preloadView = () => {
    this.setState({
      viewIsAlreadyRendered: true,
    });
  }

  onSelectFile = (selectedFile) => {
    this.setState({ selectedFile });
  }

  addSelectedFile = () => {
    this.setState(prevState => ({
      files: [...prevState.files, prevState.selectedFile],
    }));
    this.closeModal();
  }

  render() {
    const {
      isModalVisible, viewIsAlreadyRendered, selectedFile, files
    } = this.state;

    return (
      <div className="elementselect">
        <AddedFiles files={files} />
        <div
          className="btn add icon dashed"
          onClick={this.openModal}
          onMouseEnter={this.preloadView}
        >Add a MediaHaven asset</div>
        <Modal visible={isModalVisible} onClickOutside={this.closeModal}>
          {(isModalVisible || viewIsAlreadyRendered) ? (
          <View
            onSelectFile={this.onSelectFile}
            selectedFile={selectedFile}
            onAddFile={this.addSelectedFile}
          />
          ) : ''}
          <div className="footer">
            <div className="buttons right">
              <div className="btn" onClick={this.closeModal}>Cancel</div>
              <div
                className={"btn submit " + (!selectedFile ? 'disabled' : '')}
                onClick={this.addSelectedFile}
              >
                Select
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MediaHavenField;
