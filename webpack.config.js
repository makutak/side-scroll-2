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
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            }
          }

        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
};
