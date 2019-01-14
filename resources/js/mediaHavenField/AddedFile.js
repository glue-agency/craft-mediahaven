import React from 'react';

function AddedFile(props) {
  const { file, onRemoveFile } = props;

  function onRemoveClick() {
    onRemoveFile(file);
  }

  return (
    <div className="element large hasthumb removable">
      <div
        className="delete icon"
        title="Remove"
        onClick={onRemoveClick}
      ></div>
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
