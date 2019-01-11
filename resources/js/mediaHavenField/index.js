import React from 'react';
import ReactDom from 'react-dom';
import MediaHavenField from './MediaHavenField';

function initializeMediaHavenField(settings) {
  ReactDom.render(
    <MediaHavenField />,
    document.querySelector(`#${settings.id}`)
  );
}

export default initializeMediaHavenField;
