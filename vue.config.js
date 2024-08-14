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
        '@modules': require('path').resolve(__dirname, 'src/modules'),
        '@shared': require('path').resolve(__dirname, 'src/modules/__shared__'),
        '@chat': require('path').resolve(__dirname, 'src/modules/chat'),
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