import React from 'react';
import FileRow from './FileRow';

function FilesTable(props) {
  const { files, onSelectFile, selectedFile, onAddFile } = props;

  const fileRows = files.map((file, index) => (
    <FileRow
      key={index}
      file={file}
      onSelectFile={onSelectFile}
      selected={file === selectedFile}
      onAddFile={onAddFile}
    />
  ));

  return (
    <table className="data fullwidth">
      <thead>
        <tr>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        {fileRows}
      </tbody>
    </table>
  );
}

export default FilesTable;
