import { io, Socket } from "socket.io-client";

export class SocketManager {
	socket: Socket;

	constructor(messageHandler) {
		this.socket = io();
		this.socket.on("message", messageHandler);
	}

	send(msg: Message): void {
		this.socket.emit("message", msg);
	}
}

export interface Message {
	email: string;
	message: string;
}
