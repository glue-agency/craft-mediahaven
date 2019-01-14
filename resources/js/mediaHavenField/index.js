import React from 'react';
import ReactDom from 'react-dom';
import Field from './Field';

function initializeMediaHavenField(settings) {
  ReactDom.render(
    <Field name={settings.name} />,
    document.querySelector(`#${settings.id}`)
  );
}

export default initializeMediaHavenField;
