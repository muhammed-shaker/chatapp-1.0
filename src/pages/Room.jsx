import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";

const Chat = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const {id} = useParams();
  const [socket, setSocket] = useState(null)

  
  useEffect(() =>{
    const socket = new WebSocket("ws://localhost:3000");

    const request = {
      action: "subscribe",
      payload: {
        room_id: id,
        username: localStorage.getItem('username') || "anonymous"
      }
    }

    socket.addEventListener('open', () =>{
        socket.send(JSON.stringify(request));
    })

    socket.addEventListener('message', (event) =>{
      
        const {message, id: _id, action, username} = JSON.parse(event.data);        
        if(id == _id && action == "chat"){
          setMessages(prev => [...prev, {text: message, sender: username}]);
    
        }

      
    });

    setSocket(socket);

    return () =>{
      socket.close();
    }

  }, [id]);


  function updatechat(message){
    setMessages([...messages, message]);
  }

  const handleSend = () => {
    if (input.trim() !== "") {

      const request = {
        action: "broadcast",
        payload: {
          room_id: id,
          message: input
        }
      }

      socket.send(JSON.stringify(request));

      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if(isLoading){
    return <h1>Loading..</h1>
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Friend</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "You" ? "me" : "friend"}`}>
            <span>{msg.sender}: </span> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
