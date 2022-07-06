module.exports = {
	entry: {
		index: "./dist/client/js/index.js",
		signin: "./dist/client/js/signin.js",
		signup: "./dist/client/js/signup.js",
	},
	output: {
		filename: "scripts/[name].js",
		library: "app",
	},
};
