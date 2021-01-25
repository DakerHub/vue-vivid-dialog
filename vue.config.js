const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  configureWebpack: {
    entry: isDev ? './example/main.js' : './index.js',
  },
};
