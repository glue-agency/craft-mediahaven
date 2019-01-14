import React from 'react';
import DataField from './DataField';

function AddedFile(props) {
  const { file, onRemoveFile, fieldName } = props;

  function onRemoveClick() {
    onRemoveFile(file);
  }

  return (
    <div className="element large hasthumb removable">
      <DataField name={fieldName} value={file.mediaObjectId} />
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
