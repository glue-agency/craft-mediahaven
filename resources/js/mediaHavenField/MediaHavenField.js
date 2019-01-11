import React from 'react';
import Modal from './Modal';

class MediaHavenField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }

  render() {
    const { isModalVisible } = this.state;

    return (
      <div>
        <div
          className="btn add icon dashed"
          onClick={this.toggleModal}
        >Add a MediaHaven asset</div>
        <Modal visible={isModalVisible} onClickOutside={this.toggleModal}>
          <div class="footer">
            <div class="buttons right">
              <div class="btn" onClick={this.toggleModal}>Cancel</div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MediaHavenField;
