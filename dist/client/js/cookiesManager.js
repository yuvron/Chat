"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookiesManager = void 0;
class CookiesManager {
    static addCookie(name, value) {
        document.cookie = `${name}=${value}`;
    }
    static getCookie(name) {
        const cookies = document.cookie.split(";");
        const matchingCookie = cookies.find((cookie) => cookie.trim().split(";")[0] === name);
        return matchingCookie ? { name: matchingCookie[0], value: matchingCookie[1] } : undefined;
    }
    static deleteCookie(name) {
        document.cookie = `${name}=a;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    static deleteAllCookies() {
        const cookies = document.cookie.split(";");
        cookies.forEach((cookie) => {
            cookie = cookie.trim();
            const cookieName = cookie.split("=")[0];
            CookiesManager.deleteCookie(cookieName);
        });
    }
}
exports.CookiesManager = CookiesManager;
