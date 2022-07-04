module.exports = {
	entry: {
		app: "./dist/client/js/app.js",
	},
	output: {
		filename: "scripts/[name].js",
		library: "app",
	},
};
