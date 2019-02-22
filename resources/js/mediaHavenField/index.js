import React from 'react';
import ReactDom from 'react-dom';
import MediaHavenButton from './MediaHavenButton';

function initializeMediaHavenField(settings) {
  ReactDom.render(
    <MediaHavenButton
      assetsFieldId={settings.assetsFieldId}
      fieldId={settings.fieldId}
      viewMode={settings.viewMode}
    />,
    document.querySelector(`[data-mediahaven-field-for="${settings.assetsFieldId}"]`)
  );
}

export default initializeMediaHavenField;
