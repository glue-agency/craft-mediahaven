import React from 'react';
import ReactDom from 'react-dom';
import MediaHaven from './MediaHaven';

function render(element) {
  ReactDom.render(
    <MediaHaven />,
    element
  );
}

export default render;
