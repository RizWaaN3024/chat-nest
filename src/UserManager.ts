import { UserId } from "./store/Store";

interface User {
    id: string;
    name: string;
}

interface Room {
    users: User[];
}

export class UserManager {
    private rooms: Map<string, Room>;
    constructor() {
        this.rooms = new Map<string, Room>();
    }

    addUser(name: string, userId: UserId, roomId: string, socket: WebSocket) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            })
        }
        this.rooms.get(roomId)?.users.push({
            id: userId,
            name
        })
    }

    removeUser(userId: UserId, roomId: string, socket: WebSocket) {
        const users = this.rooms.get(roomId)?.users;
        if (users) {
            users.filter(({ id }) => id !== userId);
        }
    }
}