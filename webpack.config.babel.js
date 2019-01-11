import path from 'path';

export default {
  entry: {
    mediaHavenField: './resources/js/mediaHavenField/index.js'
  },
  output: {
    filename: 'mediaHavenField.js',
    path: path.resolve(__dirname, 'src/AssetBundles/dist/'),
    library: 'initializeMediaHavenField',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      }
    ]
  }
};
