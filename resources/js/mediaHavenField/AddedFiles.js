import React from 'react';
import AddedFile from './AddedFile';

function AddedFiles(props) {
  const { files } = props;

  const addedFileElements = files.map((file, index) => (
    <AddedFile key={index} file={file} />
  ));

  return (
    <div className="elements">
      {addedFileElements}
    </div>
  );
}

export default AddedFiles;
