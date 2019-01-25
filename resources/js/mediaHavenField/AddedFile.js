import React from 'react';
import DataField from './DataField';

function AddedFile(props) {
  const { file, onRemoveFile, fieldName } = props;

  function onRemoveClick() {
    onRemoveFile(file);
  }

  return (
    <div className="element large hasthumb removable">
      <DataField name={fieldName} value={file.id} />
      <div
        className="delete icon"
        title="Remove"
        onClick={onRemoveClick}
      ></div>
      <div className="elementthumb">
        <img src={file.thumb} alt="" />
      </div>
      <div className="label">
        <span className="title">{file.filename}</span>
      </div>
    </div>
  );
}

export default AddedFile;
