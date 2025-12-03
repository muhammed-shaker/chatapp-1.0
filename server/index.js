import express from 'express';
import { WebSocketServer } from "ws";
import http from 'http';
import SubscriptionManager from './lib/Subscription.js';
import Client from './lib/Client.js';


const app = express();
app.use(express.json());


const subscriptionsManager = new SubscriptionManager();

app.post("/api/room", (req, res) =>{

    const id = subscriptionsManager.createRoom();

    res.json({sucess: true, id});

});





app.get("/api/room/:id", (req, res) =>{
    const id = req.params.id; 
    if(subscriptionsManager.hasRoom(id)){
        const chat = subscriptionsManager.room(id).chat; 
        res.json({success: true, chat});

    } else{
        res.json({success: false, error: "invalid room id or not exists any more."});
    }
});


const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {

  socket.on("message", (message) => {

    const data = JSON.parse(message);
    const {action, payload} = data;
    
    if(action && payload){

        handleAction(action, payload, socket);
    }

    // try{

        

    // } catch( error){
    //     console.error(error);
    //     socket.send(JSON.stringify({success: false, error: 'invalid request'}));
    // }

  });

});


function handleAction(action, payload, socket){
    
    const { room_id } = payload;

    switch(action){
        
        case "subscribe":

            if(subscriptionsManager.hasRoom(room_id)){
                    const client = new Client(payload.username, socket);
                    subscriptionsManager.room(room_id).subscribe(client);
                    socket.send(JSON.stringify({success: true}));
            } else{
                socket.send(JSON.stringify({success: false, error: "room not found."}));
            }

            break;

        case "broadcast":
            const room = subscriptionsManager.room(room_id);
            const message = payload.message;
            
            if(room && message){

                if(room.isSubscribed(socket)){
                    subscriptionsManager.room(room_id).broadcast(message, socket);
                    socket.send(JSON.stringify({success: true}));
                } else{

                    socket.send(JSON.stringify({success: false, error: "not subscribed."}));
                }

            } else {
                socket.send(JSON.stringify({success: false, error: "room not found or invalid request."}));
            }

            break;

        default:
            socket.send(JSON.stringify({success: false, error: "invalid action."}));
            break;
    }
}


server.listen(3000);









