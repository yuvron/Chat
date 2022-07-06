import { CookiesManager } from "./cookiesManager";

const signup = document.getElementById("sign-up") as HTMLFormElement;

CookiesManager.deleteAllCookies();

signup.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(signup);
	for (const [key, value] of formData.entries()) {
		CookiesManager.addCookie(key, String(value));
	}
	const response = await fetch("/signup/auth").then((res) => res);
	if (response.status === 201) window.location.href = "/";
	else if (response.status === 409) userExists();
});

function userExists(): void {
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.classList.add("shake");
		setTimeout(() => input.classList.remove("shake"), 400);
	});
	const userExists = document.getElementById("user-exists");
	userExists.classList.add("active");
	userExists.classList.add("shake");
	setTimeout(() => userExists.classList.remove("shake"), 400);
}
