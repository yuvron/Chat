import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";

const path = require("path");

const app = express();
app.use(json());

app.use("*", (req, res, next) => {
	next();
});

app.use(express.static(path.join(__dirname, "../client"), { extensions: ["html", "css", "js"] }));

// app.get("/", (req, res) => {
// 	res.send("<html><head></head><body>wow!!</body></html");
// });

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("listening on port 3000"));
