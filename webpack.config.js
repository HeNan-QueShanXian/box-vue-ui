const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除
const VueLoaderPlugin = require("vue-loader/lib/plugin")
function resolve(dir) {
	return path.join(__dirname, dir);
}
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
	mode: "development",
	entry: resolve("./src/index.js"),
	output: {
		filename: "index.js",
		// filename: "[name].[chunkhash:8].js",
		path: resolve("lib")
	},
	optimization: {   //独立的不在基本的插件中
		minimizer: [new OptimizeCSSAssetsPlugin()]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", { targets: "defaults" }]
						]
					}
				}
			},
			{
				test: /\.svg/,
				use: ["file-loader"]
			},
			{
				test: /\.css$/,
				use: [
					// 替换 之前的style-loader
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					"css-loader",
					// "postcss-loader"
				]
			},
			{
				test: /\.vue$/,
				use: [
					"vue-loader"
				]
			},{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					// "postcss-loader",
					"less-loader"
				]
			},{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					"file-loader"
				]
			}]
	},
	resolve: {
		extensions:[".js",".css", ".vue"],  //自动补全识别后缀
		alias: {
			"@": resolve("src")
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new VueLoaderPlugin(),
	]
};