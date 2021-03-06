export class CookiesManager {
	static addCookie(name: string, value: string): void {
		document.cookie = `${name}=${value}`;
	}

	static getCookie(name: string): Cookie | undefined {
		const cookies = document.cookie.split(";");
		const matchingCookie = cookies.find((cookie) => cookie.trim().split("=")[0] === name);
		if (!matchingCookie) return undefined;
		else return { name: matchingCookie.split("=")[0].trim(), value: matchingCookie.split("=")[1].trim() };
	}

	static deleteCookie(name: string): void {
		document.cookie = `${name}=a;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	}

	static deleteAllCookies(): void {
		const cookies = document.cookie.split(";");
		cookies.forEach((cookie) => {
			cookie = cookie.trim();
			const cookieName = cookie.split("=")[0];
			CookiesManager.deleteCookie(cookieName);
		});
	}
}

export interface Cookie {
	name: string;
	value: string;
}
