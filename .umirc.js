
// ref: https://umijs.org/config/
export default {
  history: 'hash',
  targets:{
    ios:9
  },
  publicPath:'./',
  // publicPath:'/xitenggamejar/dist/',
  // base:'/xitenggamejar/',
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
      // "target": "http://192.168.1.83:9939/xitenggamejar/",
      target: "https://www.xiteng.com/xitenggamejar/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api" : "" }
    }
  },

}
