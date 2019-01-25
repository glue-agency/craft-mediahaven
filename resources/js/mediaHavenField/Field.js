import React from 'react';
import Modal from './Modal';
import View from './View';
import AddedFiles from './AddedFiles';
import axios from 'axios';

class MediaHavenField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewIsAlreadyRendered: false,
      selectedFile: null,
      files: [],
      processingFiles: [],
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
    this.setState(prevState => ({
      files: [file, ...prevState.files],
    }));
  }

  removeFile(file) {
    const { files } = this.state;
    const newFiles = [...files];
    const removeIndex = newFiles.indexOf(file);

    if (removeIndex !== -1) {
      newFiles.splice(removeIndex, 1);
      this.setState({ files: newFiles });
    }
  }

  addProcessingFile(processingFile) {
    this.setState(prevState => ({
      processingFiles: [processingFile, ...prevState.processingFiles],
    }));
  }

  removeProcessingFile(processingFile) {
    const { processingFiles } = this.state;
    const newProcessingFiles = [...processingFiles];
    const removeIndex = newProcessingFiles.indexOf(processingFile);

    if (removeIndex !== -1) {
      newProcessingFiles.splice(removeIndex, 1);
      this.setState({ processingFiles: newProcessingFiles });
    }
  }

  removeProcessingFileByMediaObjectId(mediaObjectId) {
    const { processingFiles } = this.state;
    const processingFile = processingFiles.find(file => (
      file.mediaObjectId === mediaObjectId
    ));

    if (processingFile) {
      this.removeProcessingFile(processingFile);
    }
  }

  onSelectFile = (selectedFile) => {
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
        this.removeProcessingFileByMediaObjectId(response.data.mediaObjectId);
      })
      .catch((error) => {
        console.log(error);
      });

    this.addProcessingFile(selectedFile);
    this.closeModal();
  }

  onRemoveFile = (file) => {
    this.removeFile(file)
  }

  render() {
    const {
      isModalVisible,
      viewIsAlreadyRendered,
      selectedFile,
      files,
      processingFiles
    } = this.state;
    const { name } = this.props;

    return (
      <div className="elementselect">
        <AddedFiles
          files={files}
          processingFiles={processingFiles}
          onRemoveFile={this.onRemoveFile}
          fieldName={name}
        />
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
