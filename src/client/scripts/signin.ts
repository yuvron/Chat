import { CookiesManager } from "./cookiesManager";

const signin = document.getElementById("sign-in") as HTMLFormElement;

signin.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(signin);
});
