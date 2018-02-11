var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:["./src/main.jsx",
      "webpack-dev-server/client?http://localhost:8080"],		
	output:{
		path:__dirname+"/build",
		publicPath:"/temp/",
		filename:"bundle.js"
	},
	module: {
		loaders:[{
			test:/\.jsx?$/,
			loader:'babel-loader',
			exclude:/node_modules/,
			query:{
				presets:['react']
			}
		},{
			test:/\.scss$/,
			loader:'style-loader!css-loader!sass-loader'
		},{
			test:/\.css$/,
			loader:'style-loader!css-loader'
		},{
			test:/\.(png|jpg)$/,
			loader:'file-loader'
		}]
	},
	devServer: {
		contentBase:'./build',
		watchContentBase:true,
		inline:true
	}
}