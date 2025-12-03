export default class Room{
    constructor(id){
        this.subscribers = new Set();
        this.chat = []; 
        this.id = id; 
    }

    subscribe(client){
        if(this.isSubscribed(client.socket)) return;
        this.subscribers.add(client);
    }
   
    broadcast(message, socket){


        const username = Array.from(this.subscribers).find(subscriber => subscriber.socket == socket).username;
        
        this.chat.push({
            username,
            message
        });

        this.subscribers.forEach(subscriber => subscriber.socket.send(JSON.stringify({message, username, id: this.id})));
    }

    isSubscribed(socket){
        return Array.from(this.subscribers).some(subscriber => subscriber.socket == socket)
    }
    
}