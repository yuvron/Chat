import { CookiesManager } from "./cookiesManager";

const signin = document.getElementById("sign-in") as HTMLFormElement;

CookiesManager.deleteAllCookies();

signin.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(signin);
	for (const [key, value] of formData.entries()) {
		CookiesManager.addCookie(key, String(value));
	}
	const response = await fetch("/signin/auth");
	if (response.status === 200) window.location.href = "/";
});
