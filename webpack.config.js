const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  resolve: {
    modules: ['./', 'node_modules', 'src', 'libraries','photos']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|svg)$/i,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.jpg$/,
        use: ['exif-size-loader', 'file-loader']
      },
      {
        test: /\.geojson$/,
        use: 'json-loader'
      }
    ]
  }
};