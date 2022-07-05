"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signin = document.getElementById("sign-in");
signin.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signin);
});
