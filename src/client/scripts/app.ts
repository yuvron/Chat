const chat = document.querySelector(".chat") as HTMLElement;
const newMessage = document.getElementById("new-message");

newMessage.addEventListener("submit", (e) => {
	e.preventDefault();
});

function scrollChatToBottom() {
	chat.scrollTop = chat.scrollHeight;
}

scrollChatToBottom();
