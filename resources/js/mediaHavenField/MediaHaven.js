import React from 'react';

class MediaHaven extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <div className="buttons right">
            <div className="btn">Cancel</div>
            <div className="btn disabled submit">Select</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MediaHaven;
