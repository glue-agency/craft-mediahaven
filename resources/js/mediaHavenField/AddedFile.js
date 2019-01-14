import React from 'react';

function AddedFile(props) {
  const { file } = props;

  return (
    <div className="element large hasthumb">
      <div className="elementthumb">
        <img src={file.thumbnailImagePath} alt="" />
      </div>
      <div className="label">
        <span className="title">{file.title}</span>
      </div>
    </div>
  );
}

export default AddedFile;
