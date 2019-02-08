import React from 'react';
import ReactDom from 'react-dom';
import Field from './Field';

function initializeMediaHavenField(settings) {
  ReactDom.render(
    <Field assetFieldId={settings.assetsFieldId} />,
    document.querySelector(`[data-mediahaven-field-for="${settings.assetsFieldId}"]`)
  );
}

export default initializeMediaHavenField;
