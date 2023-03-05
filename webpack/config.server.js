const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const devConfig = require('./dev');

const serverConfig = merge(devConfig, {
  devServer: {
    hot: true,
  },
  module: {
    rules: devConfig.module.rules.map(rule => {
      const { test: regExp } = rule;
      if (regExp.test('.js')) {
        rule.use = [{
          loader: 'babel-loader',
          options: {
            plugins: [
              require.resolve('react-refresh/babel')
            ]
          }
        }];
      }
      return rule;
    })
  },
  plugins: devConfig.plugins.push(new ReactRefreshWebpackPlugin());
});

module.exports = serverConfig;