import { CookiesManager } from "./cookiesManager";

const chat = document.querySelector(".chat") as HTMLElement;
const newMessage = document.getElementById("new-message");

if (!CookiesManager.getCookie("token")) window.location.href = "/signin";

newMessage.addEventListener("submit", (e) => {
	e.preventDefault();
});

function scrollChatToBottom(): void {
	chat.scrollTop = chat.scrollHeight;
}

scrollChatToBottom();
