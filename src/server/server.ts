import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());

app.use(express.static(path.join(__dirname, "../client")));

// app.get("/", (req, res) => {
// 	res.send("<html><head></head><body>wow!!</body></html");
// });

app.listen(3000, () => console.log("listening on port 3000"));
