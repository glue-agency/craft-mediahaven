import React from 'react';

class Modal extends React.Component {
  modalShadeStyles() {
    const { visible } = this.props;

    return {
      display: visible ? 'block' : 'none',
      top: '10vh',
      bottom: '10vh',
    }
  }

  render() {
    const { children, visible, onClickOutside } = this.props;

    return (
      <React.Fragment>
        <div
          className="modal-shade"
          style={{ display: visible ? 'block' : 'none' }}
          onClick={onClickOutside}
        ></div>
        <div
          className="modal elementselectormodal"
          style={this.modalShadeStyles()}
        >
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
