import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home (){
    const navigate = useNavigate();
    const [storedUsername, setStoredUsername] = useState('');
    const [username, setUsername] = useState('');


    useEffect(() => {
        
        const stored = window.localStorage.getItem('username');

        if(stored){
            setStoredUsername(stored)
        } 


    }, []);

    async function handleStart(){
        const response = await fetch("http://localhost:3000/api/room", {
            method: "POST"
        });


        const data = await response.json();
        
        if(data.success){
            console.log("Navigating to", `/room/${data.id}`);

            navigate(`/room/${data.id}`);
        }
    };

    function storeUsername(){
        if(username){
            localStorage.setItem('username', username);
            setStoredUsername(username);
        }
    }

    return (
        <div className="home-div">
            <div className="content">
                <h1 className="home-h1">Welcome to my APP</h1>
                <p className="home-p">This application is a fast and easy-to-use chat platform that allows you to communicate instantly with your friends. It offers a clean interface, real-time messaging, and a smooth user experience. Whether you want to stay connected, share ideas, or just talk casually, the app makes communication simple, quick, and enjoyable.</p>
                {storedUsername && <button className="home-button" onClick={handleStart}>Create A Chat Room</button>}
                {!storedUsername && (
                     <div>
                        <h2>What is your name?</h2>
                        <input value={username} onChange={event => setUsername(event.target.value)} placeholder="Enter your username" />
                        <button onClick={storeUsername}>set</button>
                     </div>
                )}
            </div>
        </div>
    )
}