import { connection } from "websocket";
import { UserId } from "./store/Store";
import { OutgoingMessage } from "./messages/outgoingMessages";

interface User {
    id: string;
    name: string;
    conn: connection;
}

interface Room {
    users: User[];
}

export class UserManager {
    private rooms: Map<string, Room>;
    constructor() {
        this.rooms = new Map<string, Room>();
    }

    addUser(name: string, userId: UserId, roomId: string, socket: connection) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            })
        }
        this.rooms.get(roomId)?.users.push({
            id: userId,
            name,
            conn: socket
        })
    }

    removeUser(userId: UserId, roomId: string, socket: WebSocket) {
        const users = this.rooms.get(roomId)?.users;
        if (users) {
            users.filter(({ id }) => id !== userId);
        }
    }

    getUser(roomId: string, userId: string): User | null {
        const user = this.rooms.get(roomId)?.users.find(({ id }) => id === userId);
        return user ?? null;
    }

    broadcast(roomId: string, userId: string, message: OutgoingMessage) {
        const user = this.getUser(roomId, userId);
        if (!user) {
            console.error("User not found");
        }

        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Room not found");
            return;
        }
    }
}