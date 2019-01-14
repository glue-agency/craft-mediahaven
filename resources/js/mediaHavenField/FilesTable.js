import React from 'react';

function FilesTable(props) {
  const { files } = props;

  const fileRows = files.map((file, index) => (
    <tr key={index}>
      <td>
        <div className="element small hasthumb">
          <div className="elementthumb">
            <img src={file.thumbnailImagePath} alt="" />
          </div>
          <div className="label">
            {file.title}
          </div>
        </div>
      </td>
    </tr>
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
