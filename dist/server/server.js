"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const randomcolor_1 = __importDefault(require("randomcolor"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, body_parser_1.json)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../client"), { extensions: ["html", "css", "js"] }));
app.get("/auth", (req, res) => {
    const cookies = req.cookies;
    if (getUser(cookies.email))
        res.sendStatus(200);
    else
        res.sendStatus(404);
});
app.get("/signin/auth", (req, res) => {
    const cookies = req.cookies;
    const user = getUser(cookies.email);
    if (user) {
        if (authenticatePassword(user, cookies.password)) {
            res.clearCookie("email");
            res.clearCookie("password");
            res.cookie("token", user.token);
            res.cookie("color", user.color);
            res.sendStatus(200);
        }
        else
            res.sendStatus(403);
    }
    else
        res.sendStatus(404);
});
app.get("/signup/auth", (req, res) => {
    const cookies = req.cookies;
    const user = getUser(cookies.email);
    if (!user) {
        const newUser = createUser(cookies.email, cookies.password);
        res.clearCookie("email");
        res.clearCookie("password");
        res.cookie("token", newUser.token);
        res.cookie("color", user.color);
        res.sendStatus(201);
    }
    else
        res.sendStatus(409);
});
// eslint-disable-next-line no-console
app.listen(3000, () => console.log("listening on port 3000"));
function generateToken() {
    return (0, uuid_1.v4)();
}
const usersPath = path_1.default.join(__dirname, "data/users.json");
const users = JSON.parse(fs_1.default.readFileSync(usersPath, "utf-8"));
function getUser(email) {
    return users.find((user) => user.email === email);
}
function authenticatePassword(user, password) {
    return user.password === password;
}
function createUser(email, password) {
    let token = generateToken();
    while (users.find((user) => user.token === token))
        token = generateToken();
    let color = (0, randomcolor_1.default)();
    while (users.find((user) => user.color === color))
        color = (0, randomcolor_1.default)();
    const newUser = { email, password, token, color };
    users.push(newUser);
    updateDataBase();
    return newUser;
}
function updateDataBase() {
    console.log("a");
    fs_1.default.writeFileSync(usersPath, JSON.stringify(users));
}
