var webpack = require('webpack');

console.info(__dirname + '/src/js/ali-oss.js');

module.exports = {
	entry:  __dirname + '/src/js/index.js',
	output: {
		path: __dirname + '/prd',
		filename: 'bundle.js'
	},
	node: {fs: 'empty', child_process: 'empty'},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: __dirname + '/src/js/ali-oss.js'
			}
		]
	}

}