const path = require('path')

module.exports = {
	entry: {
		index: ['babel-polyfill', './src/index.js'],
		addPuzzle: ['babel-polyfill', './src/addPuzzle.js']
	},
	output: {
		path: path.resolve(__dirname, 'public/scripts'),
		filename: '[name]-bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		publicPath: '/scripts/'
	},
	devtool: 'source-map'
}
