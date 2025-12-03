import Room from "./Room.js";
import { generateToken } from "./utils.js";

export default class SubscriptionManager {

    constructor(){
        this.rooms = new Map();     
    }


    createRoom(){
        const id = generateToken(); 
        const room = new Room(id); 
        this.rooms.set(id, room);
        return id;
    }

    room(id){
        return this.rooms.get(id);
    }

    hasRoom(id){
        return this.rooms.has(id);
    }
}