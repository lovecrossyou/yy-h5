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
    "/api": {
      target: "https://www.xiteng.com/xitenggamejar/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api" : "" }
    }
  },
}
