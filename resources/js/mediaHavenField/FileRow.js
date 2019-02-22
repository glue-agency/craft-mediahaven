import React from 'react';

function FileRow(props) {
  const { file, onSelectFile, selected, onAddFile } = props;
  const elementDiv = React.createRef();

  function onRowClick() {
    onSelectFile(file, elementDiv.current);
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
        <div className="element small hasthumb" ref={elementDiv}>
          <div className="elementthumb">
            <img srcset={file.thumbnailImagePath} alt="" />
          </div>
          <div className="label">
            {file.title}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default FileRow;
