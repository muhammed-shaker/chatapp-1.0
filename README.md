# Chatapp
Simple chat app with real time features.


## Connection Documentation
### Endpoints 

- Request: ` POST /room` create a new chat room.
- Response: `{success: true, room_id: "F9hoBlKW..."}`

- Request: ` GET /room/:id` fetch a room chat (lately joind users can fetch previous chat at first render).
- Response:  `{success: true, chat: {username: "drstone", message: "hey!"}[]}` or `{success: false, error: "invalid room id or not exists any more."}`


### Realtime Actions

Socket URL: `ws://<SERVER IP>:3000`


Users must subscribe to an already created chat room, before sending or recieving messages.
- Request: `{action: "subscribe", payload: {room_id: "F9hoBlKW...", username: "drstone"}}`   
- Respone: `{success: true}` or `{success: false, error: "room not found."}`


Send messages.
- Request: `{action: "broadcast", payload: {room_id: "F9hoBlKW...", message: "Hey!"}}`   
- Respone: `{success: true}` or `{success: false, error: "room not found or you are not subscribed."}`





