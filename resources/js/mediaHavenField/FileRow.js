import React from 'react';

function FileRow(props) {
  const { file, onSelectFile, selected, onAddFile } = props;

  function onRowClick() {
    onSelectFile(file);
  }

  function onRowDoubleClick() {
    onAddFile(file);
  }

  return (
    <tr
      onClick={onRowClick}
      onDoubleClick={onRowDoubleClick}
      className={selected ? 'sel' : ''}
    >
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
  )
}

export default FileRow;
