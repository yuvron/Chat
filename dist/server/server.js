"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const path = require("path");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("*", (req, res, next) => {
    next();
});
app.use(express_1.default.static(path.join(__dirname, "../client")));
// app.get("/", (req, res) => {
// 	res.send("<html><head></head><body>wow!!</body></html");
// });
// eslint-disable-next-line no-console
app.listen(3000, () => console.log("listening on port 3000"));
