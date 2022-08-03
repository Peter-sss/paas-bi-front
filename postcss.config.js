/*
 * @Description:
 * @Author: yk
 * @Date: 2022/8/3 17:42
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    // flexible配置
    'postcss-pxtorem': {
      rootValue: 16, //
      propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      // exclude: (e) => {
      //   if (/src(\\|\/)pages(\\|\/)systemMonitor(\\|\/)dcuMonitor/.test(e)) {
      //     return false
      //   }
      //   return true
      // }
    }
  }
}
