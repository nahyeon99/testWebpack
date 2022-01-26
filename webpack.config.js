const path = require("path");
const myLoader = require("./myLoader");
const webpack = require("webpack");
const childProcess = require("child_process"); // 터미널 명령어를 웹팩에서 사용하기 위한 모듈
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve("./src/app.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     use: [
      //         path.resolve('./myLoader.js')
      //     ]
      // }
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 20kb
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
                git commit : ${childProcess.execSync(
                  "git rev-parse -- short HEAD"
                )}
                committer : ${childProcess.execSync("git config user.name")}
                last build : ${new Date().toLocaleString()}
            `,
    }),
    new webpack.DefinePlugin({
      // 전역상수를 플러그인으로 사용가능
      pw: 123456,
    }),
    new htmlWebpackPlugin({
      // 해당 파일도 번들링을 해주는 플러그인
      template: "./src/index.html",
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 공백 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
  ],
};
