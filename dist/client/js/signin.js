"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookiesManager_1 = require("./cookiesManager");
const signin = document.getElementById("sign-in");
cookiesManager_1.CookiesManager.deleteAllCookies();
signin.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(signin);
    for (const [key, value] of formData.entries()) {
        cookiesManager_1.CookiesManager.addCookie(key, String(value));
    }
    const response = yield fetch("/signin/auth");
    if (response.status === 200)
        window.location.href = "/";
}));
