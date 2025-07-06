import { UserId } from "./store/Store";

interface User {
    id: string;
    name: string;
}

interface Room {
    users: User[];
}

export class UserManager {
    private users: Map<string, Room>;
    constructor() {
        this.users = new Map<string, Room>();
    }

    addUser(name: string, userId: UserId, roomId: string, socket: WebSocket) {

    }

    removeUser(userId: UserId, roomId: string, socket: WebSocket) {
        
    }
}