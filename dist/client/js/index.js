"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookiesManager_1 = require("./cookiesManager");
const chat = document.querySelector(".chat");
const newMessage = document.getElementById("new-message");
if (!cookiesManager_1.CookiesManager.getCookie("token"))
    window.location.href = "/signin";
newMessage.addEventListener("submit", (e) => {
    e.preventDefault();
});
function scrollChatToBottom() {
    chat.scrollTop = chat.scrollHeight;
}
scrollChatToBottom();
