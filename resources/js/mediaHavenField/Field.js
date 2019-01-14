import React from 'react';
import Modal from './Modal';
import View from './View';

class MediaHavenField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewIsAlreadyRendered: false,
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

  render() {
    const { isModalVisible, viewIsAlreadyRendered } = this.state;

    return (
      <div>
        <div
          className="btn add icon dashed"
          onClick={this.openModal}
        >Add a MediaHaven asset</div>
        <Modal visible={isModalVisible} onClickOutside={this.closeModal}>
          {(isModalVisible || viewIsAlreadyRendered) ? (
            <View />
          ) : ''}
          <div className="footer">
            <div className="buttons right">
              <div className="btn" onClick={this.closeModal}>Cancel</div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MediaHavenField;
