import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import randomColor from "randomcolor";
import path from "path";
import fs from "fs";

const app = express();
app.use(cookieParser());
app.use(json());

app.use(express.static(path.join(__dirname, "../client"), { extensions: ["html"] }));

app.get("/auth", (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (getUser(cookies.email)) res.sendStatus(200);
	else res.sendStatus(404);
});

app.get("/signin/auth", (req: Request, res: Response) => {
	const cookies = req.cookies;
	const user = getUser(cookies.email);
	if (user) {
		if (authenticatePassword(user, cookies.password)) {
			res.clearCookie("email");
			res.clearCookie("password");
			res.cookie("token", user.token);
			res.cookie("color", user.color);
			res.sendStatus(200);
		} else res.sendStatus(403);
	} else res.sendStatus(404);
});

app.get("/signup/auth", (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!getUser(cookies.email)) {
		const newUser = createUser(cookies.email, cookies.password);
		res.clearCookie("email");
		res.clearCookie("password");
		res.cookie("token", newUser.token);
		res.cookie("color", newUser.color);
		res.sendStatus(201);
	} else res.sendStatus(409);
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("listening on port 3000"));

function generateToken(): string {
	return uuidv4();
}

interface User {
	email: string;
	password: string;
	token: string;
	color: string;
}
const usersPath = path.join(__dirname, "data/users.json");
const users: User[] = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

function getUser(email: string): User | undefined {
	return users.find((user) => user.email === email);
}

function authenticatePassword(user: User, password: string): boolean {
	return user.password === password;
}

function createUser(email: string, password: string): User {
	let token = generateToken();
	while (users.find((user) => user.token === token)) token = generateToken();
	let color = randomColor();
	while (users.find((user) => user.color === color)) color = randomColor();
	const newUser: User = { email, password, token, color };
	users.push(newUser);
	updateDataBase();
	return newUser;
}

function updateDataBase(): void {
	console.log("a");
	fs.writeFileSync(usersPath, JSON.stringify(users));
}
