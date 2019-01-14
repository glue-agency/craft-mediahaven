import React from 'react';
import AddedFile from './AddedFile';
import DataField from './DataField';

function AddedFiles(props) {
  const { files, onRemoveFile, fieldName } = props;

  const addedFileElements = files.map((file, index) => (
    <AddedFile
      key={index}
      file={file}
      onRemoveFile={onRemoveFile}
      fieldName={fieldName}
    />
  ));

  return (
    <div className="elements">
      <DataField name={fieldName} value="" />
      {addedFileElements}
    </div>
  );
}

export default AddedFiles;
