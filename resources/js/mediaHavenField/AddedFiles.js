import React from 'react';
import AddedFile from './AddedFile';
import ProcessingFile from './ProcessingFile';
import DataField from './DataField';

function AddedFiles(props) {
  const { files, processingFiles, onRemoveFile, fieldName } = props;

  const addedFileElements = files.map((file, index) => (
    <AddedFile
      key={index}
      file={file}
      onRemoveFile={onRemoveFile}
      fieldName={fieldName}
    />
  ));

  const processingFileElements = processingFiles.map((file, index) => (
    <ProcessingFile key={index} file={file} />
  ));

  return (
    <div className="elements">
      <DataField name={fieldName} value="" />
      {processingFileElements}
      {addedFileElements}
    </div>
  );
}

export default AddedFiles;
