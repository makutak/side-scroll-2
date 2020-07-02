module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    path: `${__dirname}/docs`,
    filename: 'main.js',
  },

  devServer: {
    contentBase: 'dist',
    open: true,
  },
};
