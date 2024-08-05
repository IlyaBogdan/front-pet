const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
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