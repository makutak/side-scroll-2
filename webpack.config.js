module.exports = {
  mode: 'development',
  entry: './src/index.ts',

  output: {
    path: `${__dirname}/docs`,
    filename: 'main.js',
  },

  devServer: {
    contentBase: 'docs',
    open: true,
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
    }],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
};
