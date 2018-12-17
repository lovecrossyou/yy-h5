export default {
  history: 'hash',
  targets: {
    android: 6,
    ios: 7,
  },
  publicPath:'./',
  base:'/yy/',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      immer: true,
    }],
  ],
  theme: './config/theme.config.js',
  proxy: {
    "/h5": {
      target: "http://47.94.209.108:7002/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/h5" : "" }
    },
  },
}
