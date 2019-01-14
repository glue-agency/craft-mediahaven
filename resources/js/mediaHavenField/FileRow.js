import React from 'react';

function FileRow(props) {
  const { file, onSelect, selected } = props;

  function onRowClick() {
    onSelect(file);
  }

  return (
    <tr
      onClick={onRowClick}
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
