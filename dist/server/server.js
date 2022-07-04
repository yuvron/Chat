const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
	res.send("<html><head></head<body>aoa</body></html>");
});

app.use(
	express.static(path.join(__dirname, "../client"), (req, res, next) => {
		next();
	})
);

app.listen(3000, () => console.log("listening on port 3000"));
