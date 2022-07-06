import { CookiesManager } from "./cookiesManager";

const signin = document.getElementById("sign-in") as HTMLFormElement;
const noUserError = document.getElementById("no-user");
const wrongPasswordError = document.getElementById("wrong-password");

CookiesManager.deleteAllCookies();

signin.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(signin);
	for (const [key, value] of formData.entries()) {
		CookiesManager.addCookie(key, String(value));
	}
	const response = await fetch("/signin/auth");
	if (response.status === 200) window.location.href = "/";
	else if (response.status === 404) showError(404);
	else if (response.status === 403) showError(403);
});

function showError(status: number): void {
	const error = status === 404 ? noUserError : wrongPasswordError;
	const otherError = error === noUserError ? wrongPasswordError : noUserError;
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.classList.add("shake");
		setTimeout(() => input.classList.remove("shake"), 400);
	});
	error.classList.add("active");
	error.classList.add("shake");
	setTimeout(() => error.classList.remove("shake"), 400);
	error.classList.add("block");
	otherError.classList.remove("block");
}

function noUser(): void {
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.classList.add("shake");
		setTimeout(() => input.classList.remove("shake"), 400);
	});
	noUserError.classList.add("active");
	noUserError.classList.add("shake");
	setTimeout(() => noUserError.classList.remove("shake"), 400);
	noUserError.classList.add("block");
	wrongPasswordError.classList.remove("block");
}

function wrongPassword(): void {
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.classList.add("shake");
		setTimeout(() => input.classList.remove("shake"), 400);
	});
	wrongPasswordError.classList.add("active");
	wrongPasswordError.classList.add("shake");
	setTimeout(() => wrongPasswordError.classList.remove("shake"), 400);
	wrongPasswordError.classList.add("block");
	noUserError.classList.remove("block");
}
