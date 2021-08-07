const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch:true,
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  mode:'development',
  devServer: {
    contentBase: "./src"
  },
  plugins: [
    new HtmlWebpackPlugin({
     title: 'Development',
     template: './src/index.html'
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: 'main.js',
    clean:true
  }
};