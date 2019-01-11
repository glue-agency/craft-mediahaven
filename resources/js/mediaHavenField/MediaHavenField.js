import React from 'react';

class MediaHavenField extends React.Component {
  onClick() {
    console.log('Add a MediaHaven asset');
  }

  render() {
    return (
      <div>
        <div
          className="btn add icon dashed"
          onClick={this.onClick}
        >Add a MediaHaven asset</div>
      </div>
    );
  }
}

export default MediaHavenField;
