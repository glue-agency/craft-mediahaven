import path from 'path';

export default {
  entry: {
    mediaHavenField: './resources/js/mediaHavenField.js'
  },
  output: {
    filename: 'mediaHavenField.js',
    path: path.resolve(__dirname, 'src/AssetBundles/dist/'),
    library: 'MediaHavenField',
    libraryTarget: 'window',
    libraryExport: 'default'
  }
};
