import React from 'react';
import Modal from './Modal';
import View from './View';
import axios from 'axios';

class MediaHavenButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewIsAlreadyRendered: false,
      selectedFile: null,
      isAddingFile: false,
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

  addFile(file) {
    const element = this.getMediaHavenToCraftConnection().selectedFileElement;

    element.dataset.imageWidth = file.width;
    element.dataset.imageHeight = file.height;
    element.dataset.dataType = 'craft\\elements\\Asset';
    element.dataset.id = file.id;
    element.dataset.siteId = file.site_id;
    element.dataset.status = file.status;
    element.dataset.label = file.title;
    element.dataset.url = file.url;
    element.dataset.level = '';
    element.dataset.editable = '';

    this.getAssetSelectInput().selectElements([{
      $element: window.$(element),
      id: file.id,
      label: file.title,
    }]);
  }

  getAssetSelectInput() {
    return this.getMediaHavenToCraftConnection().assetSelectInput;
  }

  getMediaHavenToCraftConnection() {
    const { assetsFieldId } = this.props;

    return window.mediaHavenToCraftConnections.find((connection) => {
      return connection.assetsFieldId == assetsFieldId;
    });
  }

  onSelectFile = (selectedFile, selectedFileElement) => {
    const connection = this.getMediaHavenToCraftConnection();
    connection.selectedFileElement = selectedFileElement;

    this.setState({ selectedFile });
  }

  addSelectedFile = () => {
    const { selectedFile, isAddingFile } = this.state;

    if (!selectedFile || isAddingFile) {
      return;
    }

    this.setState({ isAddingFile: true });

    const data = new FormData();
    data.append('originalFileName', selectedFile.originalFileName);
    data.append('mediaObjectId', selectedFile.mediaObjectId);
    data.append('imagePath', selectedFile.previewImagePath);
    data.append('title', selectedFile.title);

    axios
      .post('/admin/mediahaven/assets', data, {
        'headers': { 'X-CSRF-Token': Craft.csrfTokenValue }
      })
      .then((response) => {
        this.addFile(response.data);
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setState({ isAddingFile: false });
      });

  }

  render() {
    const {
      isModalVisible,
      viewIsAlreadyRendered,
      selectedFile,
      isAddingFile,
    } = this.state;

    return (
      <div className="elementselect">
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
              isAddingFile={isAddingFile}
            />
          ) : ''}
          <div className="footer">
            <div className="buttons right">
              <div className="btn" onClick={this.closeModal}>Cancel</div>
              <div
                className={"btn submit " + (!selectedFile || isAddingFile ? 'disabled' : '')}
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

export default MediaHavenButton;
