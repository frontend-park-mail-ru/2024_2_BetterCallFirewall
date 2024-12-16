const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: './public/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
					'file-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.scss'],
	},
	mode: 'production',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	optimization: {
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
	},
	plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
};
