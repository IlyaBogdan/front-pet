/* eslint-disable */
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
  },
  configureWebpack: {
    entry: './src/main.ts',
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
          exclude: /node_modules/,
        },
      ],
    },
  },
});