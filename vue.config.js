const Webpack = require('webpack');

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(new Webpack.DefinePlugin({
      'process.env.API_URL': '"http://localhost:8080/api-citas-providencia/public"',
      'process.env.reCAPTCHA_SITE_KEY': '"6LdvhowUAAAAANO_QqjifLELhrAazeoNd2bL3iNt"',
    }));

    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins.push(new Webpack.DefinePlugin({
    //     'process.env.API_URL': '"https://bbvacontinental.kontigo.pe/api/v1"',
    //     'process.env.reCAPTCHA_SITE_KEY': '"6LdvhowUAAAAANO_QqjifLELhrAazeoNd2bL3iNt"',
    //   }));
    // } else if (process.env.NODE_ENV === 'uat') {
    //   config.plugins.push(new Webpack.DefinePlugin({
    //     'process.env.API_URL': '"http://35.171.162.173:4001/api/v1"',
    //     'process.env.reCAPTCHA_SITE_KEY': '"6LdvhowUAAAAANO_QqjifLELhrAazeoNd2bL3iNt"',
    //   }));
    // } else {
    //   config.plugins.push(new Webpack.DefinePlugin({
    //     'process.env.API_URL': '"http://localhost:4001/api/v1"',
    //     'process.env.reCAPTCHA_SITE_KEY': '"6LdvhowUAAAAANO_QqjifLELhrAazeoNd2bL3iNt"',
    //   }));
    // }
    // config.plugins.push(new Webpack.DefinePlugin({
    //   'process.env.API_URL': '"http://35.171.162.173:4001/api/v1"', // 54.174.88.163
    //   // 'process.env.API_URL': '"http://54.174.88.163/api/v1"',
    //   'process.env.reCAPTCHA_SITE_KEY': '"6LdvhowUAAAAANO_QqjifLELhrAazeoNd2bL3iNt"',
    // }));
  },
};
