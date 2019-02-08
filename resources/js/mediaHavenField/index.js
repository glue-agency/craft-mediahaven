import React from 'react';
import ReactDom from 'react-dom';
import MediaHavenButton from './MediaHavenButton';

function initializeMediaHavenField(settings) {
  ReactDom.render(
    <MediaHavenButton assetsFieldId={settings.assetsFieldId} />,
    document.querySelector(`[data-mediahaven-field-for="${settings.assetsFieldId}"]`)
  );
}

export default initializeMediaHavenField;
