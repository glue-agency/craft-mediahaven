import React from 'react';
import Spinner from './Spinner';

function ProcessingFile(props) {
  const { file } = props;

  return (
    <div className="element large hasthumb">
      <div className="elementthumb">
        <img src={file.thumbnailImagePath} alt="" style={{ opacity: '.1' }} />
        <div style={{ position: 'absolute' }}>
          <Spinner isLoading={true} />
        </div>
      </div>
      <div className="label">
        <span className="title">{file.title}</span>
      </div>
    </div>
  );
}

export default ProcessingFile;
