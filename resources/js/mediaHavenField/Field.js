import React from 'react';
import Modal from './Modal';
import View from './View';
import axios from 'axios';

class MediaHavenField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewIsAlreadyRendered: false,
      selectedFile: null,
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
    const element = window.$(
      this.getMediaHavenReference().selectedFileElement
    );

    this.getAssetField().selectElements([{
      $element: element,
      id: file.id,
      label: file.title,
    }]);
  }

  getAssetField() {
    return this.getMediaHavenReference().object;
  }

  getMediaHavenReference() {
    const { assetFieldId } = this.props;

    return window.mediaHavenReferences.find((reference) => {
      return reference.key == assetFieldId;
    });
  }

  onSelectFile = (selectedFile, selectedFileElement) => {
    const reference = this.getMediaHavenReference();
    reference.selectedFileElement = selectedFileElement;

    this.setState({ selectedFile });
  }

  addSelectedFile = () => {
    const { selectedFile } = this.state;

    if (!selectedFile) {
      return;
    }

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
      });

  }

  render() {
    const {
      isModalVisible,
      viewIsAlreadyRendered,
      selectedFile,
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
