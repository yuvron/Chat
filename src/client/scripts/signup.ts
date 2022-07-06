import { CookiesManager } from "./cookiesManager";

const signup = document.getElementById("sign-up") as HTMLFormElement;

CookiesManager.deleteAllCookies();

signup.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(signup);
	for (const [key, value] of formData.entries()) {
		CookiesManager.addCookie(key, String(value));
	}
	const response = await fetch("/signup/auth");
	if (response.status === 201) window.location.href = "/";
});
