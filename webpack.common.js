const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
	return {
		entry: {
			loading: ["./js/components/loading.js"],
			"home.style": ["./js/styles/home.style.js"],
		},
		output: {
			path: path.resolve(__dirname, "dist/js"),
			filename: "[name].js",
			clean: true,
		},
		plugins: [new MiniCssExtractPlugin()],
		module: {
			rules: [
				{
					test: /js\/styles\/\.(?:js|mjs|cjs)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							compact: true,
							minified: true,
							comments: false,
							presets: [
								[
									"@babel/preset-env",
									{
										targets: "defaults",
									},
								],
							],
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						env.NODE_ENV !== "production"
							? "style-loader"
							: MiniCssExtractPlugin.loader,
						"css-loader", // translates CSS into CommonJS
						{
							loader: "sass-loader",
							options: {
								data: `
                  $env: "${env.NODE_ENV}";
                  ${
										env.NODE_ENV === "development"
											? "@import '../styles.scss';@import '../components/loading.scss';"
											: ""
									}
                `,
							},
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: "style-loader",
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
								importLoaders: 1,
							},
						},
					],
				},
				{
					test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
					type: "asset/resource",
					generator: {
						filename: "./[path][name][ext]",
					},
				},
			],
		},
	};
};
