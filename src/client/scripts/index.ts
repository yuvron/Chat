import { CookiesManager } from "./cookiesManager";
import { SocketManager, Message } from "./socketManager";

const HALF_OF_RGB_SUM = 383;

const chat = document.querySelector(".chat") as HTMLElement;
const newMessage = document.getElementById("new-message") as HTMLFormElement;
const submit = document.querySelector(".message-button") as HTMLButtonElement;
const email = document.getElementById("email");
const messageArea = document.querySelector(".message-area") as HTMLTextAreaElement;

const socket = new SocketManager(messageArrived);
let user;
const pressedKeys = {};

validate();

function validate(): void {
	if (!CookiesManager.getCookie("token")) window.location.href = "/signin";
	else email.style.color = CookiesManager.getCookie("color").value.replace("%23", "#");
	user = {
		email: CookiesManager.getCookie("email").value,
		color: CookiesManager.getCookie("color").value,
	};
	setEmailText();
}

function messageArrived(message: Message): void {
	const newMessage = document.createElement("div");
	newMessage.classList.add("message");
	const emailRow = document.createElement("p");
	emailRow.classList.add("message-email");
	emailRow.innerHTML = message.email;
	emailRow.style.color = message.color.replace("%23", "#");
	const contentRow = document.createElement("p");
	contentRow.classList.add("message-content");
	contentRow.innerHTML = message.message;
	newMessage.appendChild(emailRow);
	newMessage.appendChild(contentRow);
	chat.appendChild(newMessage);
	scrollChatToBottom();
}

function setEmailText(): void {
	email.innerHTML = CookiesManager.getCookie("email").value;
}

newMessage.addEventListener("submit", (e) => {
	e.preventDefault();
	if (messageArea.value === "") return;
	else if (messageArea.value.replace(/^(\r\n)|(\n)/g, "") === "") {
		messageArea.value = "";
		return;
	} else {
		const text = messageArea.value;
		messageArea.value = "";
		sendMessage(text);
	}
});

document.addEventListener("keydown", (e) => {
	pressedKeys[e.code] = true;
	if (!((pressedKeys["Enter"] && pressedKeys["ShiftLeft"]) || (pressedKeys["Enter"] && pressedKeys["ShiftRight"]))) {
		if (e.code === "Enter" && document.activeElement === messageArea) {
			e.preventDefault();
			submit.click();
		}
	}
});
document.addEventListener("keyup", (e) => delete pressedKeys[e.code]);

function sendMessage(text: string): void {
	socket.send({
		email: user.email,
		color: user.color,
		message: text,
	});
}

function scrollChatToBottom(): void {
	chat.scrollTop = chat.scrollHeight;
}
