import { CookiesManager } from "./cookiesManager";
import { SocketManager, Message } from "./socketManager";

const HALF_OF_RGB_SUM = 383;

const socket = new SocketManager(messageArrived);

const chat = document.querySelector(".chat") as HTMLElement;
const newMessage = document.getElementById("new-message");
const email = document.getElementById("email");

if (!CookiesManager.getCookie("token")) window.location.href = "/signin";
else email.style.color = CookiesManager.getCookie("color").value.replace("%23", "#");

setEmailText();
setEmailBackground();

function messageArrived(message: Message): void {
	chat.innerHTML += `<p>${message.email} : ${message.message}</p>`;
	scrollChatToBottom();
}

function setEmailText(): void {
	email.innerHTML = CookiesManager.getCookie("email").value;
}

function setEmailBackground(): void {
	const color = email.style.color
		.replace(/[^\d,]/g, "")
		.split(",")
		.map((value) => +value);
	const sumOfColors = color.reduce((sum, color) => sum + color, 0);
	if (sumOfColors < HALF_OF_RGB_SUM) email.style.backgroundColor = "white";
	else email.style.backgroundColor = "black";
}

newMessage.addEventListener("submit", (e) => {
	e.preventDefault();
	const text = (document.querySelector(".message-area") as HTMLTextAreaElement).value;
	socket.send({ email: CookiesManager.getCookie("email").value, message: text });
});

function scrollChatToBottom(): void {
	chat.scrollTop = chat.scrollHeight;
}
